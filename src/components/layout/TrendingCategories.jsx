import React, { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "Alphabet Maha Shivratri",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Anniversary",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Bhagwat Geeta Shlok",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Business Intro",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Business Post Maha",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Color And Gulal",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Congratulation",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Daily Politics",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Delhi Election result",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Demo Images",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Devotional",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Dhol Nagad",
    image:
      "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const TrendingCategories = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Auto scroll effect with pause on hover
  //   useEffect(() => {
  //     const container = scrollRef.current;
  //     if (!container) return;

  //     const autoScroll = () => {
  //       if (isPaused) return;

  //       setScrollPosition((prev) => {
  //         const newPos = prev + 0.5;
  //         const maxScroll = container.scrollWidth - container.clientWidth;
  //         return newPos >= maxScroll ? 0 : newPos;
  //       });

  //       container.scrollTo({
  //         left: scrollPosition,
  //         behavior: "smooth",
  //       });
  //     };

  //     const interval = setInterval(autoScroll, 20);
  //     return () => clearInterval(interval);
  //   }, [scrollPosition, isPaused]);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      const maxScroll = container.scrollWidth / 2;
      const newPos = container.scrollLeft + 1;

      container.scrollLeft = newPos >= maxScroll ? 0 : newPos;
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="text-blue-600">Explore</span> trending categories on{" "}
          <span className="font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ">
            Publicity Poster
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover popular categories and make your posts stand out with
          professional designs
        </p>
      </div>

      <div
        ref={scrollRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          scrollBehavior: "auto",
          whiteSpace: "nowrap",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        {/* Gradient fade effects */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex py-4 px-2" style={{ gap: "24px" }}>
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 h-80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              style={{
                width: "256px",
                position: "relative",
              }}
            >
              {/* Animated border effect */}
              <div
                className="absolute inset-0 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f97316, #3b82f6)",
                  backgroundSize: "400% 400%",
                  animation: "borderAnimation 3s ease infinite",
                  padding: "2px",
                }}
              />

              <div
                className="relative h-64 overflow-hidden rounded-t-xl z-10 bg-white"
                style={{ margin: "2px" }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div
                className="p-4 bg-white text-center relative z-10"
                style={{ margin: "0 2px 2px 2px" }}
              >
                <h3
                  className="font-semibold text-gray-800 transition-all duration-300 py-1 px-2 rounded-md relative overflow-hidden"
                  style={{
                    background:
                      hoveredIndex === index ? "#3b82f6" : "transparent",
                    color: hoveredIndex === index ? "white" : "#1f2937",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {cat.title}

                  {/* Animated underline for title */}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                    style={{
                      width: hoveredIndex === index ? "100%" : "0%",
                    }}
                  />
                </h3>

                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                    View Templates
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate items for seamless looping */}
          {categories.map((cat, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex-shrink-0 w-64 h-80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              style={{
                width: "256px",
                position: "relative",
              }}
            >
              {/* Animated border effect */}
              <div
                className="absolute inset-0 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f97316, #3b82f6)",
                  backgroundSize: "400% 400%",
                  animation: "borderAnimation 3s ease infinite",
                  padding: "2px",
                }}
              />

              <div
                className="relative h-64 overflow-hidden rounded-t-xl z-10 bg-white"
                style={{ margin: "2px" }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div
                className="p-4 bg-white text-center relative z-10"
                style={{ margin: "0 2px 2px 2px" }}
              >
                <h3
                  className="font-semibold text-gray-800 transition-all duration-300 py-1 px-2 rounded-md relative overflow-hidden"
                  style={{
                    background:
                      hoveredIndex === index + categories.length
                        ? "#3b82f6"
                        : "transparent",
                    color:
                      hoveredIndex === index + categories.length
                        ? "white"
                        : "#1f2937",
                  }}
                  onMouseEnter={() =>
                    setHoveredIndex(index + categories.length)
                  }
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {cat.title}

                  {/* Animated underline for title */}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                    style={{
                      width:
                        hoveredIndex === index + categories.length
                          ? "100%"
                          : "0%",
                    }}
                  />
                </h3>

                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                    View Templates
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105">
          View All Categories
        </button>
      </div>
    </div>
  );
};

export default TrendingCategories;
