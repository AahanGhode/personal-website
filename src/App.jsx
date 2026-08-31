import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "./layout/Footer";
import { useEffect, useState } from "react";

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    let removeLoaderTimeout;
    let finishLoadingTimeout;
    const loadingStartedAt = performance.now();

    const finishLoading = () => {
      const remainingTime = Math.max(
        0,
        1000 - (performance.now() - loadingStartedAt)
      );

      finishLoadingTimeout = window.setTimeout(() => {
        setLoaderVisible(false);
        removeLoaderTimeout = window.setTimeout(() => {
          setShowLoader(false);
          setPageVisible(true);
        }, 450);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      requestAnimationFrame(finishLoading);
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener("load", finishLoading);
      window.clearTimeout(finishLoadingTimeout);
      window.clearTimeout(removeLoaderTimeout);
    };
  }, []);

  return (<div className={`min-h-screen overflow-x-hidden ${!pageVisible ? "overflow-y-hidden" : ""}`}>
    {showLoader && (
      <div
        className={`loading-screen ${loaderVisible ? "loading-screen-visible" : "loading-screen-hidden"}`}
        role="status"
        aria-label="Loading website"
      >
        <div className="loading-content">
          <div className="loading-spinner" aria-hidden="true">
            <span className="loading-circle loading-circle-outer" />
            <span className="loading-circle loading-circle-middle" />
            <span className="loading-circle loading-circle-inner" />
          </div>
          <span className="loading-label">Loading</span>
        </div>
      </div>
    )}
    <CustomCursor />
    <div className={`navbar-entry ${pageVisible ? "navbar-entry-visible" : ""}`}>
      <Navbar />
    </div>
    <div className={`site-content ${pageVisible ? "site-content-visible" : ""}`}>
      <main>
        <Hero isPageLoaded={pageVisible} />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  </div>
  )
}

export default App;
