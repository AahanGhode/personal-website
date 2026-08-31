import { Button } from "@/components/Button";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Instagram,
  ChevronDown,
} from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { NoPreviewLink } from "@/components/NoPreviewLink";
import { useEffect, useState } from "react";

const heroTitle = "Hey, I'm Aahan.";
const heroNameStart = heroTitle.indexOf("Aahan");

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Vercel",
  "Tailwind CSS",
  "Prisma",
  "Figma",
  "Git",
  "C++",
  "Python",
  "MATLAB",
  "OnScale",
  "Linux",
  "Flask",
  "Django",
  "REST APIs",
]

export const Hero = ({ isPageLoaded }) => {
  const [typedTitle, setTypedTitle] = useState("");
  const [isDocumentVisible, setIsDocumentVisible] = useState(
    () => !document.hidden
  );
  const [backgroundDots] = useState(() =>
    [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${15 + Math.random() * 20}s`,
      delay: `${Math.random() * 5}s`,
    }))
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isPageLoaded) {
      return undefined;
    }

    let currentLength = 0;

    const typeNextCharacter = () => {
      currentLength += 1;
      setTypedTitle(heroTitle.slice(0, currentLength));

      if (currentLength < heroTitle.length) {
        const typingDelay = 120 + Math.random() * 45;
        typingTimeout = window.setTimeout(typeNextCharacter, typingDelay);
      }
    };

    let typingTimeout = window.setTimeout(typeNextCharacter, 150);

    return () => window.clearTimeout(typingTimeout);
  }, [isPageLoaded]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bg Section */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Hero Image"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundDots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "var(--color-primary)",
              left: dot.left,
              top: dot.top,
              animation: `slow-drift ${dot.duration} ease-in-out infinite`,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Aspiring Embedded Systems Engineer
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-tight animate-fade-in animation-delay-100">
                {typedTitle.slice(0, heroNameStart)}
                <span className="text-primary">
                  {typedTitle.slice(heroNameStart)}
                </span>
                <span
                  className={`typing-cursor ${typedTitle.length === heroTitle.length ? "typing-cursor-hidden" : ""}`}
                  aria-hidden="true"
                />
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                I am an incoming Computer Engineering student at the University
                of Toronto and a Schulich Leader Scholar, currently looking for
                embedded systems internships at the intersection of hardware
                and software.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>
              <AnimatedBorderButton href="/resume.html">
                <Download className="w-5 h-5" />
                Download CV
              </AnimatedBorderButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">Follow me: </span>
              {[
                { icon: Github, href: "https://github.com/aahanghode" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/aahan-ghode-33376824a/",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/aahanghode/",
                },
              ].map((social, idx) => (
                <NoPreviewLink
                  key={idx}
                  href={social.href}
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  {<social.icon className="w-5 h-5" />}
                </NoPreviewLink>
              ))}
            </div>
          </div>
          {/* Right Column - Profile Image */}
          <div className="relative animate-fade-in animation-delay-300">
            {/* Profile Image */}
            <div className="relative max-w-md mx-auto">
              <div className="relative glass rounded-3xl p-2 frosted-border">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src="/profile-photo.jpg"
                    alt="Aahan Ghode"
                    className="w-full h-full -translate-x-16 scale-[1.7] object-cover object-center"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py--3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
                {/* Stats Badge */}
                <div className="absolute -top-4 -left-4 glass border-transparent rounded-xl px-4 py-3 animate-float animation-delay-500">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-sm font-medium text-foreground">
                    Years of Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>
          <div className="relative overflow-hidden">
            <div
              className={`flex animate-marquee ${!isDocumentVisible ? "marquee-paused" : ""}`}
            >
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-fade-in animation-delay-800 pointer-events-auto">
        <NoPreviewLink
          href="#about"
          aria-label="Scroll to About section"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </NoPreviewLink>
      </div>
    </section>
  );
}