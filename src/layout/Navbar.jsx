import { Button } from "@/components/Button";
import { NoPreviewLink } from "@/components/NoPreviewLink";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  {href: "#about", label: "About"},
  {href: "#projects", label: "Projects"},
  {href: "#experience", label: "Experience"},
  {href: "#testimonials", label: "Testimonials"},
]

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuRendered, setIsMobileMenuRendered] = useState(false);
  const[isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let closeMenuTimeout;

    if (isMobileMenuOpen) {
      setIsMobileMenuRendered(true);
    } else {
      closeMenuTimeout = window.setTimeout(() => {
        setIsMobileMenuRendered(false);
      }, 300);
    }

    return () => window.clearTimeout(closeMenuTimeout);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? "glass-strong border-0 py-3" : "bg-transparent py-5"} z-50`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <NoPreviewLink
          href="#"
          className="text-xl font-serif font-bold tracking-tight hover:text-primary"
        >
          AKG<span className="text-primary">.</span>
        </NoPreviewLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navLinks.map((link, index) => (
              <NoPreviewLink
                href={link.href}
                key={index}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground focus:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full hover:bg-surface"
              >
                {link.label}
              </NoPreviewLink>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            size="sm"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative flex h-10 w-10 items-center justify-center text-foreground cursor-pointer"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <Menu
            size={24}
            className={`absolute transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            size={24}
            className={`absolute transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuRendered && (
        <div
          className={`md:hidden bg-transparent backdrop-blur-none ${
            isMobileMenuOpen ? "mobile-menu-in" : "mobile-menu-out"
          }`}
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <NoPreviewLink
                href={link.href}
                key={index}
                className="text-lg text-muted-foreground hover:text-foreground focus:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary py-2"
              >
                {link.label}
              </NoPreviewLink>
            ))}

            <Button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
            >
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}