import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { NoPreviewLink } from "@/components/NoPreviewLink";

const projects = [
  {
    title: "Stock Dashboard",
    description:
      "An interactive finance platform for tracking stocks, visualizing market data, and managing a personalized watchlist.",
    image: "/projects/project1.png",
    tags: ["React", "Vite", "Tailwind CSS", "TradingView"],
    link: "https://stock-dashboard-flame.vercel.app/",
    github: "https://github.com/AahanGhode/stock-dashboard",
  },
  {
    title: "SteriliStation",
    description:
      "An Arduino-based C++ project for a practical automated station, combining embedded logic with hands-on hardware control.",
    image: "/projects/project2.jpg",
    tags: ["C++", "Arduino", "Embedded Control", "Hardware Prototyping"],
    link: "#",
    hasLiveDemo: false,
    github: "https://github.com/AahanGhode/SteriliStation",
  },
  {
    title: "Ultrasonic Car Sensor",
    description:
      "A C++ Arduino project using ultrasonic sensing to detect nearby objects and support responsive behaviour in a small vehicle prototype.",
    image: "/projects/project3.jpg",
    tags: ["C++", "Arduino", "Ultrasonic Sensing", "Distance Detection"],
    link: "#",
    hasLiveDemo: false,
    github: "https://github.com/AahanGhode/UltrasonicCarSensor",
  },
  {
    title: "GreggMaster",
    description:
      "An AI-powered study guide that turns course material into flashcards, quizzes, and structured study support.",
    image: "/projects/project4.png",
    tags: ["TypeScript", "React", "Python", "AI"],
    link: "https://gregg-master.vercel.app/",
    github: "https://github.com/AahanGhode/GreggMaster",
  },
];

export const Projects = () => {
  const sectionReveal = useScrollReveal();

  return (
    <section id="projects" {...sectionReveal} className={`${sectionReveal.className} py-32 relative overflow-hidden`}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-normal mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Building with
            <span className="font-serif italic font-normal text-white">
              {" "}
              purpose.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of work exploring software, scientific computing, and
            the connection between digital tools and real-world systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 
                bg-gradient-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.hasLiveDemo !== false && (
                    <NoPreviewLink
                      href={project.link}
                      className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </NoPreviewLink>
                  )}
                  <NoPreviewLink
                    href={project.github}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </NoPreviewLink>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    className="w-5 h-5 
                  text-muted-foreground group-hover:text-primary
                   group-hover:translate-x-1 
                   group-hover:-translate-y-1 transition-all"
                  />
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <AnimatedBorderButton href="https://github.com/AahanGhode">
            View All Projects
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};