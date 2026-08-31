import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  {
    icon: Code2,
    title: "Hardware + Software",
    description:
      "Exploring how software can interact with and control physical systems.",
  },
  {
    icon: Rocket,
    title: "Scientific Computing",
    description:
      "Using simulation, modelling, and data analysis to understand complex systems.",
  },
  {
    icon: Users,
    title: "Automation",
    description:
      "Building tools and workflows that make repetitive work faster and more reliable.",
  },
  {
    icon: Lightbulb,
    title: "Clear Communication",
    description:
      "Turning technical requirements into practical solutions and sharing ideas clearly.",
  },
];

export const About = () => {
  const sectionReveal = useScrollReveal();

  return (
    <section id="about" {...sectionReveal} className={`${sectionReveal.className} py-32 relative overflow-hidden`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-normal leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              From physical systems
              <span className="font-serif italic font-normal text-white">
                {" "}
                to reliable software.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I am an incoming Computer Engineering student at the University
                of Toronto, building toward a career in embedded systems and
                hardware-software integration. I am drawn to the point where
                physical devices, real-world signals, and carefully engineered
                software meet.
              </p>
              <p>
                My background in simulation engineering and scientific
                computing has taught me to question assumptions, understand
                system behaviour, and build tools that remain reliable beyond
                ideal conditions.
              </p>
              <p>
                My experience also spans C++, Python, Java, JavaScript, Arduino,
                and Raspberry Pi, along with internships in software development
                and database automation. I am currently looking for embedded
                systems internships where I can keep learning and contribute to
                reliable technology with real-world impact.
              </p>
            </div>

          </div>

          {/* Right Column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="group glass p-6 rounded-2xl animate-fade-in transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};