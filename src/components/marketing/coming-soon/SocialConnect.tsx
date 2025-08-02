import React from "react";
import { Instagram, Facebook } from "lucide-react";

const SocialConnect = () => {
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    // { icon: Pinterest, label: 'Pinterest', href: '#' },
    // { icon: Linkedin, label: 'LinkedIn', href: '#' },
  ];

  return (
    <section className="bg-gradient-to-b from-black via-zinc-900 to-black py-32 text-center font-sans">
      <div className="container mx-auto px-4">
        <div className="relative mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white font-serif tracking-wider mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Connect With Us
          </h2>
          <div className="absolute left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
        </div>

        <p className="text-gray-300 mb-16 max-w-2xl mx-auto text-lg leading-relaxed">
          Follow our journey and be part of the Stardom story as we prepare to
          unveil luxury reimagined.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 transition-all duration-500 hover:from-zinc-800 hover:to-zinc-700"
            >
              <div className="flex flex-col items-center gap-5">
                <social.icon className="h-10 w-10 text-gray-300 group-hover:text-white transition-all duration-500 transform group-hover:scale-110" />
                <span className="text-base font-light tracking-wider text-gray-300 group-hover:text-white transition-all duration-500">
                  {social.label}
                </span>
              </div>
              <div className="absolute inset-0 border border-zinc-700/50 rounded-xl group-hover:border-zinc-500/50 transition-colors duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-gold-300 via-transparent to-gold-300" />
            </a>
          ))}
        </div>

        <p className="text-gray-400 mt-16 font-light tracking-wide">
          Follow us for exclusive previews and behind-the-scenes content
        </p>
      </div>
    </section>
  );
};

export default SocialConnect;
