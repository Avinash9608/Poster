import React, { useState, useEffect } from "react";

const EnhancedHero = ({
  title = "Create and Share Amazing Publicity Posters",
  subtitle = "Design eye-catching posters for your events, products, and services",
  backgroundImage = "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  primaryButtonText = "Get Started",
  secondaryButtonText = "Browse Posters",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle button clicks
  const handlePrimaryButtonClick = () => {
    // Use window.location.href for a full page navigation
    window.location.href = "/login";
  };

  const handleSecondaryButtonClick = () => {
    const featuredPostersSection = document.querySelector("#featured-posters");
    if (featuredPostersSection) {
      featuredPostersSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Set loaded state for animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Responsive styles
  const styles = {
    container: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: 1,
      transform: isLoaded ? "scale(1)" : "scale(1.1)",
      transition: "transform 1s ease-out",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(135deg, rgba(30, 64, 175, 0.85) 0%, rgba(55, 48, 163, 0.85) 100%)",
      zIndex: 2,
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 1s ease-out",
    },
    content: {
      position: "relative",
      zIndex: 3,
      textAlign: "center",
      padding: "0 20px",
      maxWidth: "1200px",
      transform: isLoaded ? "translateY(0)" : "translateY(20px)",
      opacity: isLoaded ? 1 : 0,
      transition: "all 0.8s ease-out",
    },
    title: {
      fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
      fontWeight: 800,
      color: "white",
      marginBottom: "1.5rem",
      lineHeight: 1.2,
      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
    subtitle: {
      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
      color: "rgba(255, 255, 255, 0.9)",
      marginBottom: "2.5rem",
      maxWidth: "800px",
      marginLeft: "auto",
      marginRight: "auto",
      lineHeight: 1.6,
    },
    buttons: {
      display: "flex",
      gap: "1.5rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    primaryButton: {
      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      color: "white",
      padding: "1rem 2rem",
      borderRadius: "50px",
      border: "none",
      fontSize: "1.1rem",
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      boxShadow: "0 4px 15px rgba(79, 70, 229, 0.4)",
      transition: "all 0.3s ease",
    },
    secondaryButton: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(5px)",
      color: "white",
      padding: "1rem 2rem",
      borderRadius: "50px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      fontSize: "1.1rem",
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "all 0.3s ease",
    },
    scrollIndicator: {
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 3,
      color: "white",
      animation: "bounce 2s infinite",
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 0.5s ease-out 0.8s",
    },
    waveDivider: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      zIndex: 3,
    },
    waveSvg: {
      width: "100%",
      height: "auto",
      display: "block",
    },
  };

  return (
    <div style={styles.container}>
      {/* Background image */}
      <div style={styles.background}></div>

      {/* Overlay */}
      <div style={styles.overlay}></div>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.subtitle}>{subtitle}</p>

        <div style={styles.buttons}>
          <button
            style={styles.primaryButton}
            onClick={handlePrimaryButtonClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(79, 70, 229, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(79, 70, 229, 0.4)";
            }}
          >
            {primaryButtonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            style={styles.secondaryButton}
            onClick={handleSecondaryButtonClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            {secondaryButtonText}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={styles.scrollIndicator}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Wave Divider */}
      <div style={styles.waveDivider}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={styles.waveSvg}
        >
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,101.3C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default EnhancedHero;
