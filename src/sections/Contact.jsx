import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "aahanghode@gmail.com",
    href: "mailto:aahanghode@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (437) 259-4983",
    href: "tel:+14372594983",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Toronto, CA",
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Contact = () => {
  const sectionReveal = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextFieldErrors = {
      name: formData.name.trim() ? "" : "Please enter your name.",
      email: emailPattern.test(formData.email)
        ? ""
        : "Please enter a valid email address.",
      message: formData.message.trim() ? "" : "Please enter a message.",
    };

    setFieldErrors(nextFieldErrors);
    if (Object.values(nextFieldErrors).some(Boolean)) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error.text || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="contact" {...sectionReveal} className={`${sectionReveal.className} py-32 relative overflow-hidden`}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-normal mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Let's build{" "}
            <span className="font-serif italic font-normal text-white">
                something great
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Looking for an embedded systems or software engineering intern? I’d
            love to hear from you. Send me a message and let’s talk about how I
            could contribute to your team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="glass p-8 rounded-3xl border border-primary/30 animate-fade-in animation-delay-300">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name..."
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setFieldErrors({ ...fieldErrors, name: "" });
                  }}
                  className={`w-full px-4 py-3 bg-surface rounded-xl border focus:ring-1 focus:ring-primary outline-none transition-all ${
                    fieldErrors.name
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                      : "border-border focus:border-primary"
                  }`}
                />
                {fieldErrors.name && (
                  <p className="mt-2 text-sm text-red-400">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  type="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setFieldErrors({ ...fieldErrors, email: "" });
                  }}
                  className={`w-full px-4 py-3 bg-surface rounded-xl border focus:ring-1 focus:ring-primary outline-none transition-all ${
                    fieldErrors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                      : "border-border focus:border-primary"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="mt-2 text-sm text-red-400">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    setFieldErrors({ ...fieldErrors, message: "" });
                  }}
                  placeholder="Your message..."
                  className={`message-scrollbar w-full px-4 py-3 bg-surface rounded-xl border focus:ring-1 focus:ring-primary outline-none transition-all resize-none ${
                    fieldErrors.message
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                      : "border-border focus:border-primary"
                  }`}
                />
                {fieldErrors.message && (
                  <p className="mt-2 text-sm text-red-400">{fieldErrors.message}</p>
                )}
              </div>

              <Button
                className="w-full"
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {submitStatus.type && (
                <div
                  className={`flex items-center gap-3
                     p-4 rounded-xl ${
                       submitStatus.type === "success"
                         ? "bg-green-500/10 border border-green-500/20 text-green-400"
                         : "bg-red-500/10 border border-red-500/20 text-red-400"
                     }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in animation-delay-400">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  item.href ? (
                    <button
                      type="button"
                      key={i}
                      onClick={() => window.location.assign(item.href)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="font-medium">{item.value}</div>
                      </div>
                    </button>
                  ) : (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="font-medium">{item.value}</div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="glass rounded-3xl p-8 border border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Currently Available</span>
              </div>
              <p className="text-muted-foreground text-sm">
                I’m currently seeking internship opportunities where I can learn,
                contribute, and grow at the intersection of hardware and
                software.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};