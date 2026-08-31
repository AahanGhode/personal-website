import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const experiences = [
  {
    period: "Jul 2026 — Aug 2026",
    role: "Simulation Engineer",
    company: "Sunnybrook Research Institute · Toronto, ON",
    description: [
      "Modeled OnScale FEA simulations for radially-poled PZT-4 ring transducers across 5+ catheter geometry iterations.",
      "Built MATLAB pipelines to parse binary time-histories and accelerate post-processing.",
      "Analyzed pressure, displacement, and stress fields to optimize acoustic energy delivery and establish safe drive voltage limits.",
    ],
    technologies: ["OnScale", "FEA", "MATLAB", "PZT-4"],
    current: true,
  },
  {
    period: "Jun 2023 — Jun 2026",
    role: "Lead Assistant Teacher",
    company: "Spirit of Math Schools Inc. · Oakville, ON",
    description: [
      "Taught advanced mathematics curricula to 40+ Grade 9–12 students.",
      "Mentored 15+ students weekly on advanced coursework.",
      "Collaborated with senior faculty on progress evaluations and personalized learning plans.",
    ],
    technologies: ["Mathematics", "Mentoring", "Instruction"],
    current: false,
  },
  {
    period: "Nov 2024 — May 2025",
    role: "Full Stack Developer Intern",
    company: "Vertex Dimension · Remote",
    description: [
      "Developed custom front-end components and integrated third-party Shopify apps using HTML and CSS.",
      "Translated business requirements into precise engineering specifications across 10+ client meetings.",
      "Improved SEO structures and site navigation flow for client e-commerce sites.",
    ],
    technologies: ["HTML", "CSS", "Shopify", "SEO"],
    current: false,
  },
  {
    period: "Aug 2023 — Oct 2023",
    role: "Database Administrator Intern",
    company: "RS Tec Systems Inc. · Oakville, ON",
    description: [
      "Engineered a resume parser for 200+ applicant documents across PDF, DOCX, and DOC formats.",
      "Integrated the Google Sheets API and implemented security enhancements.",
      "Designed a responsive Flask and Bootstrap interface for internal database management.",
    ],
    technologies: ["Python", "Flask", "Google Sheets API", "Bootstrap"],
    current: false,
  },
];

export const Experience = () => {
  const sectionReveal = useScrollReveal();
  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState(() => new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const itemIndex = Number(entry.target.dataset.index);
          setVisibleItems((currentItems) => {
            if (currentItems.has(itemIndex)) return currentItems;

            const nextItems = new Set(currentItems);
            nextItems.add(itemIndex);
            return nextItems;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" {...sectionReveal} className={`${sectionReveal.className} py-32 relative overflow-hidden`}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span
            className="text-secondary-foreground text-sm
           font-medium tracking-wider uppercase animate-fade-in"
          >
            Career Journey
          </span>
          <h2
             className="text-4xl md:text-5xl font-normal
           mt-4 mb-6 animate-fade-in animation-delay-100
            text-secondary-foreground"
          >
            Experiences that{" "}
            <span className="font-serif italic font-normal text-white">
              {" "}
              shape how I build.
            </span>
          </h2>

          <p
            className="text-muted-foreground
           animate-fade-in animation-delay-200"
          >
            A timeline of my professional growth, from curious beginner to
            senior engineer leading teams and building products at scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                ref={(item) => {
                  itemRefs.current[idx] = item;
                }}
                data-index={idx}
                className={`relative grid md:grid-cols-2 gap-8 opacity-0 ${
                  visibleItems.has(idx) ? "animate-fade-in" : ""
                }`}
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${
                    idx % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <div
                    className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}
                  >
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <ul className="text-sm text-muted-foreground mt-4 space-y-2 list-disc list-inside">
                      {exp.description.map((point, pointIdx) => (
                        <li key={pointIdx}>{point}</li>
                      ))}
                    </ul>
                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${
                        idx % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/15 hover:text-primary hover:ring-1 hover:ring-primary/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};