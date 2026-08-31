import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    quote:
      "Aahan is remarkably detail-oriented and consistently delivers great results. He is sincere, reliable, honest, friendly, and always open to thoughtful challenge.",
    author: "Snehal Katarey",
    role: "RS Tec Systems Inc.",
  },
  {
    quote:
      "Aahan completed his internship as a full-stack developer on a financial transaction portal using ReactJS, REST APIs, and Vercel. He was highly motivated, an excellent learner, and helped build an end-to-end application for real business needs.",
    author: "Chetan Thakkar",
    role: "Internship Supervisor",
  },
  {
    quote:
      "Aahan completed 40 hours as a volunteer trainee with Zirkel Technologies, contributing to the development team on a Parent Engagement Portal for his high school. He quickly proved himself to be highly motivated, eager to learn, and capable of making a meaningful contribution to a real-world project.",
    author: "Kapil Gupta",
    role: "CEO, Zirkel Technologies Inc.",
  },
];

export const Testimonials = () => {
  const sectionReveal = useScrollReveal();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const next = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setActiveIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  return (
    <section id="testimonials" {...sectionReveal} className={`${sectionReveal.className} py-32 relative overflow-hidden`}>
      <div
        className="container mx-auto 
      px-6 relative z-10"
      >
        {/* Section Header */}
        <div
          className="text-center max-w-3xl 
        mx-auto mb-16"
        >
          <span
            className="text-secondary-foreground 
          text-sm font-medium tracking-wider 
          uppercase animate-fade-in"
          >
            What People Say
          </span>
          <h2
            className="text-4xl md:text-5xl 
          font-normal mt-4 mb-6 animate-fade-in
          animation-delay-100 text-secondary-foreground"
          >
            Kind words from{" "}
            <span
              className="font-serif italic 
            font-normal text-white"
            >
              amazing people
            </span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="max-w-4xl mx-auto"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
          role="region"
          aria-label="Testimonials carousel"
        >
          <div className="relative">
            {/* Main Testimonial */}
            <div
              key={activeIdx}
              className="glass p-8 rounded-3xl md:p-12 frosted-border testimonial-switch animation-delay-200"
            >
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>

              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pt-4">
                "{testimonials[activeIdx].quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold">
                    {testimonials[activeIdx].author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeIdx].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
                onClick={previous}
              >
                <ChevronLeft />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeIdx
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};