export const NoPreviewLink = ({ href, children, className = "", ...props }) => {
  const navigate = () => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href.startsWith("#")) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      role="link"
      tabIndex={0}
      className={className}
      onClick={navigate}
      onKeyDown={(event) => {
        if (event.key === "Enter") navigate();
      }}
      {...props}
    >
      {children}
    </a>
  );
};
