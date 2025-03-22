import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

// Initialize DOMPurify with jsdom
const window = new JSDOM("").window;
const purify = DOMPurify(window);

const rateLimits = new Map<string, { count: number; timestamp: number }>();

// Configure rate limiting
const RATE_LIMIT_MAX = 30; // Maximum requests per time window
const RATE_LIMIT_WINDOW = 3600 * 1000; // Time window in milliseconds (1 hour)

// Clean up stale rate limit entries periodically
const cleanupInterval = 3600 * 1000; // 1 hour
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimits.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      rateLimits.delete(key);
    }
  }
}, cleanupInterval);

const transporter = nodemailer.createTransport({
  // @ts-expect-error idk why this is throwing an error
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    const now = Date.now();
    const rateLimit = rateLimits.get(ip) || { count: 0, timestamp: now };

    // Reset counter if the time window has passed
    if (now - rateLimit.timestamp > RATE_LIMIT_WINDOW) {
      rateLimit.count = 0;
      rateLimit.timestamp = now;
    }

    // Check if rate limit is exceeded
    if (rateLimit.count >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 },
      );
    }

    // Parse request body
    const {
      name = "",
      email = "",
      phone = "Phone not provided",
      subject = "No Subject",
      message = "",
    } = await request.json();

    // Validate inputs
    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedName = purify.sanitize(name);
    const sanitizedEmail = purify.sanitize(email);
    const sanitizedPhone = purify.sanitize(phone);
    const sanitizedSubject = purify.sanitize(subject);
    const sanitizedMessage = purify.sanitize(message);

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    // Get current date in a nice format
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create a premium, visually striking HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact from Stardom</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            
            body {
              font-family: 'Poppins', Arial, sans-serif;
              color: #2d3748;
              line-height: 1.8;
              background-color: #f7fafc;
              margin: 0;
              padding: 0;
            }
            
            .container {
              max-width: 650px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            }
            
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 30px;
              text-align: center;
              color: white;
            }
            
            .logo {
              margin-bottom: 15px;
              font-size: 28px;
              font-weight: 700;
              letter-spacing: 1px;
            }
            
            .header h2 {
              margin: 0;
              font-weight: 600;
              font-size: 24px;
              letter-spacing: 0.5px;
            }
            
            .date-banner {
              background-color: rgba(255, 255, 255, 0.1);
              padding: 8px 15px;
              border-radius: 50px;
              font-size: 14px;
              display: inline-block;
              margin-top: 10px;
            }
            
            .content {
              padding: 40px 30px;
              background-color: white;
            }
            
            .intro {
              margin-bottom: 30px;
              font-size: 16px;
              color: #4a5568;
              border-left: 4px solid #764ba2;
              padding-left: 15px;
            }
            
            .card {
              background-color: #f8fafc;
              border-radius: 10px;
              padding: 25px;
              margin-bottom: 30px;
              border-top: 5px solid #667eea;
            }
            
            .field {
              margin-bottom: 20px;
            }
            
            .field:last-child {
              margin-bottom: 0;
            }
            
            .label {
              font-weight: 600;
              color: #4a5568;
              display: block;
              margin-bottom: 8px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .value {
              font-size: 16px;
              color: #2d3748;
              line-height: 1.6;
            }
            
            .message-box {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #667eea;
              font-style: italic;
              line-height: 1.8;
            }
            
            .cta {
              text-align: center;
              margin: 35px 0 25px;
            }
            
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              padding: 12px 30px;
              border-radius: 50px;
              font-weight: 600;
              letter-spacing: 0.5px;
              font-size: 16px;
              transition: transform 0.3s ease;
            }
            
            .cta-button:hover {
              transform: translateY(-3px);
            }
            
            .footer {
              background-color: #f7fafc;
              padding: 25px;
              text-align: center;
              font-size: 14px;
              color: #718096;
              border-top: 1px solid #e2e8f0;
            }
            
            .signature {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px dashed #e2e8f0;
              text-align: center;
              font-size: 15px;
              color: #4a5568;
            }
            
            .highlight {
              color: #667eea;
              font-weight: 600;
            }
            
            @media only screen and (max-width: 600px) {
              .container {
                width: 100%;
                border-radius: 0;
              }
              
              .header, .content, .footer {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">STARDOM</div>
              <h2>New Client Inquiry</h2>
              <div class="date-banner">${currentDate}</div>
            </div>
            
            <div class="content">
              <div class="intro">
                You've received a new message from an interested client who visited your website. Here are their details:
              </div>
              
              <div class="card">
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${sanitizedName}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email Address</div>
                  <div class="value">${sanitizedEmail}</div>
                </div>
                
                <div class="field">
                  <div class="label">Phone Number</div>
                  <div class="value">${sanitizedPhone}</div>
                </div>
                
                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value">${sanitizedSubject}</div>
                </div>
              </div>
              
              <div class="field">
                <div class="label">Their Message</div>
                <div class="message-box">${sanitizedMessage.replace(/\n/g, "<br>")}</div>
              </div>
              
              <div class="cta">
                <a href="mailto:${sanitizedEmail}" class="cta-button">Reply Now</a>
              </div>
              
              <div class="signature">
                This is an automated email from your <span class="highlight">Stardom</span> website.<br>
                Received on ${new Date().toLocaleString()} from IP: ${ip}
              </div>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Stardom. All rights reserved.</p>
              <p>This message contains confidential information and is intended only for the recipient.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Stardom Digital" <${process.env.MAIL_USER}>`,
      to: process.env.MY_MAIL,
      replyTo: sanitizedEmail,
      priority: "high",
      subject: `✨ New Client Inquiry: ${sanitizedSubject}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    // Increment rate limit counter
    rateLimit.count += 1;
    rateLimits.set(ip, rateLimit);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
