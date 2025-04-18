import React, { useState, useEffect } from "react";
import "./AboutSection.css";

// Poster design images with high-quality publicity poster examples
const posterImages = [
  "https://images.unsplash.com/photo-1614036417651-efe5912149d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", // Colorful poster design
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", // Designer working
  "https://images.unsplash.com/photo-1540397106260-e24a507a08ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", // Poster wall
  "https://images.unsplash.com/photo-1516900557549-41557d405adf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", // Colorful design
];

// Fallback images if needed
const fallbackImages = [
  "https://via.placeholder.com/800x600/4481eb/ffffff?text=Stunning+Poster+Designs",
  "https://via.placeholder.com/800x600/4481eb/ffffff?text=Professional+Templates",
  "https://via.placeholder.com/800x600/4481eb/ffffff?text=Creative+Freedom",
  "https://via.placeholder.com/800x600/4481eb/ffffff?text=Instant+Distribution",
];

const cards = [
  {
    title: "Professional Templates",
    copy: "500+ customizable templates for every occasion",
    button: "Explore Templates",
    image: posterImages[0],
    fallback: fallbackImages[0],
  },
  {
    title: "Multi-Platform Sharing",
    copy: "One-click publishing to social networks and print services",
    button: "Try Now",
    image: posterImages[1],
    fallback: fallbackImages[1],
  },
  {
    title: "Advanced Editor",
    copy: "Pixel-perfect control over every element with 100+ fonts & assets",
    button: "Launch Editor",
    image: posterImages[2],
    fallback: fallbackImages[2],
  },
  {
    title: "Performance Tracking",
    copy: "Real-time engagement analytics with 15+ detailed metrics",
    button: "See Insights",
    image: posterImages[3],
    fallback: fallbackImages[3],
  },
];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Apply custom CSS for card backgrounds
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement("style");

    // Function to preload images and use fallbacks if needed
    const preloadImages = () => {
      cards.forEach((card, index) => {
        const img = new Image();
        img.onerror = () => {
          // If image fails to load, update the CSS to use fallback
          const fallbackStyle = document.createElement("style");
          fallbackStyle.textContent = `
            .card:nth-child(${index + 1}):before {
              background-image: url(${card.fallback});
            }
          `;
          document.head.appendChild(fallbackStyle);
        };
        img.src = card.image;
      });
    };

    // Preload images
    preloadImages();

    // Set the CSS content
    styleEl.textContent = `
      .card:nth-child(1):before {
        background-image: url(${cards[0].image});
      }
      .card:nth-child(2):before {
        background-image: url(${cards[1].image});
      }
      .card:nth-child(3):before {
        background-image: url(${cards[2].image});
      }
      .card:nth-child(4):before {
        background-image: url(${cards[3].image});
      }

      /* Add animation delay based on card index */
      .card {
        transition: transform var(--d) var(--e), opacity 0.6s ease;
        transition-delay: var(--card-delay, 0s);
      }

      /* Enhanced hover effect */
      .card:hover .content {
        transform: translateY(-10px);
      }
    `;

    // Append to head
    document.head.appendChild(styleEl);

    // Clean up function
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <section id="about-section" className="aboutsec py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wider">
            PUBLICITY POSTER PLATFORM
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Craft Stunning Publicity Posters
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform empowers creators to design eye-catching publicity
            posters that captivate audiences. With intuitive tools and
            professional templates, you can create impactful visual
            communications for any purpose.
          </p>
        </div>

        {/* Card Grid with Custom Images */}
        <main
          className={`page-content transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {cards.map((card, index) => (
            <article
              key={index}
              className="card"
              style={{
                "--card-delay": `${index * 0.1}s`,
              }}
            >
              <div
                className="content"
                style={{
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <h2 className="title">{card.title}</h2>
                <p className="copy">{card.copy}</p>
                <button className="btn">{card.button}</button>
              </div>
            </article>
          ))}
        </main>

        {/* Custom CSS for card backgrounds is applied via useEffect */}

        {/* CTA Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="cta-container">
            <div className="sparkle-icon">✨</div>
            <h3 className="cta-title">Ready to Create Your First Poster?</h3>
            <p className="cta-subtitle">
              Join thousands of creators who trust our platform for their
              publicity needs
            </p>
            <button className="cta-button">Get Started Free</button>
            <div className="cta-dots"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
