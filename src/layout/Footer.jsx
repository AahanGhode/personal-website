import { Github, Linkedin, Instagram } from "lucide-react";
import { NoPreviewLink } from "@/components/NoPreviewLink";

const socialLinks = [
  { icon: Github, href: "https://github.com/aahanghode", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/aahan-ghode-33376824a/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/aahanghode/",
    label: "Instagram",
  },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <NoPreviewLink
              href="#"
              className="text-xl font-serif font-bold tracking-tight hover:text-primary transition-colors"
            >
              AKG<span className="text-primary">.</span>
            </NoPreviewLink>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Aahan Ghode. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:justify-self-center">
            {footerLinks.map((link) => (
              <NoPreviewLink
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </NoPreviewLink>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4 md:justify-self-end">
            {socialLinks.map((social) => (
              <NoPreviewLink
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </NoPreviewLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};