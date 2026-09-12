import type { SVGProps } from "react";

/**
 * Brand marks for the social links. Lucide dropped brand icons in v1, and these
 * five are all the site needs, so they live here as plain paths rather than
 * pulling in a second icon package.
 */
type IconProps = SVGProps<SVGSVGElement>;

const Svg = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {children}
  </svg>
);

export const FacebookIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
  </Svg>
);

export const InstagramIcon = (props: IconProps) => (
  <Svg {...props} fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </Svg>
);

export const LinkedinIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.2 8.48h3.5V21H3.2V8.48Zm5.9 0h3.35v1.71h.05c.47-.85 1.6-1.75 3.3-1.75 3.53 0 4.18 2.2 4.18 5.06V21h-3.5v-6.05c0-1.44-.03-3.3-2.06-3.3-2.07 0-2.38 1.57-2.38 3.2V21H9.1V8.48Z" />
  </Svg>
);

export const YoutubeIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.06V8.94L15.2 12 10 15.06Z" />
  </Svg>
);

export const XIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M17.53 3H20.5l-6.49 7.42L21.64 21h-5.97l-4.68-6.12L5.6 21H2.63l6.94-7.93L2.36 3h6.12l4.23 5.6L17.53 3Zm-1.04 16.2h1.65L7.6 4.71H5.83L16.49 19.2Z" />
  </Svg>
);
