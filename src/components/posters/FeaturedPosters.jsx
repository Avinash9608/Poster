import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EnhancedPosterCard from "./EnhancedPosterCard";
import Button from "../ui/EnhancedButton";
import SearchBar from "./SearchBar";
import "./FloatingCard.css";

const FeaturedPosters = () => {
  const navigate = useNavigate();
  const [featuredPosters, setFeaturedPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const placeholderScrollRef = useRef(null);
  const mainScrollRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAllPosters, setShowAllPosters] = useState(false);
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    category: "all",
  });
  const [filteredPosters, setFilteredPosters] = useState([]);

  // Navigation and authentication are handled directly

  // Placeholder data for development
  const placeholderPosters = [
    {
      _id: "1",
      title: "Summer Music Festival",
      description: "Join us for a weekend of amazing music and fun activities.",
      imageUrl:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
      category: "events",
      creator: { name: "Event Organizer" },
    },
    {
      _id: "2",
      title: "Tech Conference 2023",
      description: "The biggest tech event of the year with industry leaders.",
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
      category: "conferences",
      creator: { name: "Tech Association" },
    },
    {
      _id: "3",
      title: "Art Exhibition",
      description: "Showcasing works from emerging and established artists.",
      imageUrl:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
      category: "exhibitions",
      creator: { name: "Art Gallery" },
    },
    {
      _id: "4",
      title: "Food Festival",
      description: "Taste cuisines from around the world in one place.",
      imageUrl:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
      category: "events",
      creator: { name: "Food Network" },
    },
    {
      _id: "5",
      title: "Music Workshop",
      description:
        "Learn from professional musicians in this interactive workshop.",
      imageUrl:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
      category: "workshops",
      creator: { name: "Event Organizer" },
    },
    {
      _id: "6",
      title: "Tech Conference 2023",
      description: "The biggest tech event of the year with industry leaders.",
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
      category: "conferences",
      creator: { name: "Tech Association" },
    },
    {
      _id: "7",
      title: "Jazz Concert",
      description: "An evening of smooth jazz with renowned musicians.",
      imageUrl:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
      category: "concerts",
      creator: { name: "Art Gallery" },
    },
    {
      _id: "8",
      title: "Cooking Workshop",
      description: "Learn to cook international cuisines with expert chefs.",
      imageUrl:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
      category: "workshops",
      creator: { name: "Food Network" },
    },
  ];

  // Auto-scroll functionality with progress tracking
  useEffect(() => {
    // Don't auto-scroll when in grid view
    if (showAllPosters) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
      return;
    }

    // Force initial scroll position and progress update
    const initializeScroll = () => {
      const container =
        isLoading || error
          ? placeholderScrollRef.current
          : mainScrollRef.current;

      if (container) {
        // Start at the beginning
        container.scrollLeft = 0;
        setScrollProgress(0);
      }
    };

    // Initialize scroll position
    initializeScroll();

    const startAutoScroll = () => {
      // Clear any existing interval
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      // Set up auto-scroll interval
      autoScrollIntervalRef.current = setInterval(() => {
        if (!isPaused) {
          const container =
            isLoading || error
              ? placeholderScrollRef.current
              : mainScrollRef.current;

          if (container) {
            // Calculate current progress
            const maxScroll = container.scrollWidth - container.clientWidth;
            const currentScroll = container.scrollLeft;
            const currentProgress = (currentScroll / maxScroll) * 100;

            // Check if we've reached the end
            const isAtEnd = currentProgress >= 95;

            if (isAtEnd) {
              // If at the end, scroll back to start
              container.scrollTo({ left: 0, behavior: "smooth" });
              setScrollProgress(0); // Reset progress indicator
            } else {
              // Move forward by a fixed amount
              const nextScrollPosition = currentScroll + 300; // Move 300px at a time

              // Calculate the new progress percentage
              const nextProgress = Math.min(
                100,
                (nextScrollPosition / maxScroll) * 100
              );

              // Scroll to that position
              container.scrollTo({
                left: nextScrollPosition,
                behavior: "smooth",
              });

              // Update progress state
              setScrollProgress(nextProgress);
            }
          }
        }
      }, 2000); // Scroll every 2 seconds for more frequent movement
    };

    // Start auto-scrolling when component mounts or when switching back to carousel view
    startAutoScroll();

    // Clean up interval on unmount
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isLoading, error, isPaused, showAllPosters]);

  // Pause auto-scroll when user interacts with the container
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => {
    // Add a small delay before resuming to allow for touch scrolling
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Update scroll progress based on scroll position
  const handleScroll = (e) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Calculate progress percentage (0-100)
    const progress = Math.min(
      100,
      Math.max(0, (scrollPosition / maxScroll) * 100)
    );

    // Update the progress state with a smooth animation, but only if it's different
    if (Math.abs(progress - scrollProgress) > 1) {
      setScrollProgress(progress);
    }

    // Update active dots visually
    const activeDotIndex = Math.min(7, Math.floor((progress / 100) * 8));
    const dots = document.querySelectorAll(".progress-dot");
    if (dots && dots.length) {
      dots.forEach((dot, index) => {
        if (index <= activeDotIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  };

  useEffect(() => {
    const fetchFeaturedPosters = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/posters/featured");
        setFeaturedPosters(response.data);
        // Initialize filtered posters with fetched data
        setFilteredPosters(
          response.data.length > 0 ? response.data : placeholderPosters
        );
      } catch (err) {
        console.error("Error fetching featured posters:", err);
        setError("Failed to load featured posters");
        // Initialize with placeholder data if fetch fails
        setFilteredPosters(placeholderPosters);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPosters();
  }, []);

  // Filter posters based on search parameters
  useEffect(() => {
    try {
      // Use placeholder data if API fails or during development
      const postersToFilter =
        Array.isArray(featuredPosters) && featuredPosters.length > 0
          ? featuredPosters
          : Array.isArray(placeholderPosters)
          ? placeholderPosters
          : [];

      // Apply filters
      let filtered = [...postersToFilter];

      // Filter by search term
      if (searchParams.searchTerm) {
        const term = searchParams.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (poster) =>
            poster &&
            poster.title &&
            poster.description &&
            (poster.title.toLowerCase().includes(term) ||
              poster.description.toLowerCase().includes(term))
        );
      }

      // Filter by category (if not 'all')
      if (searchParams.category !== "all") {
        // Assuming posters have a category property
        // If your data structure is different, adjust this filter
        filtered = filtered.filter(
          (poster) => poster && poster.category === searchParams.category
        );
      }

      setFilteredPosters(filtered);
    } catch (error) {
      console.error("Error filtering posters:", error);
      setFilteredPosters([]);
    }
  }, [featuredPosters, searchParams, placeholderPosters]);

  // Handle search
  const handleSearch = (params) => {
    setSearchParams(params);
  };

  // Use filtered posters for display
  // Ensure displayPosters is always an array
  const displayPosters =
    Array.isArray(filteredPosters) && filteredPosters.length > 0
      ? filteredPosters
      : Array.isArray(placeholderPosters)
      ? placeholderPosters
      : [];

  return (
    <section
      id="featured-posters"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className=" mb-3">
            <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full">
              FEATURED COLLECTION
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4 relative inline-block">
            Featured Posters
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-0"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Check out some of our most popular publicity posters created by our
            talented community.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {showAllPosters ? (
          // Grid view for all posters
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {isLoading ? (
              // Loading placeholders for grid view
              [...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : error ? (
              // Error message with placeholder posters in grid view
              <>
                <div className="col-span-full mb-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 mx-auto max-w-2xl">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Don't worry, we have some great examples for you:
                  </p>
                </div>
                {placeholderPosters.map((poster) => (
                  <div
                    key={poster._id}
                    className="card-appear"
                    style={{ animationDelay: `${Math.random() * 0.5}s` }}
                  >
                    <EnhancedPosterCard poster={poster} />
                  </div>
                ))}
              </>
            ) : (
              // Actual posters in grid view
              displayPosters.map((poster) => (
                <div
                  key={poster._id}
                  className="card-appear"
                  style={{ animationDelay: `${Math.random() * 0.5}s` }}
                >
                  <EnhancedPosterCard poster={poster} />
                </div>
              ))
            )}
          </div>
        ) : (
          // Carousel view with auto-scrolling
          <div>
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
                <p className="mt-4 text-gray-500 font-medium">
                  Loading amazing posters...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 mx-auto max-w-2xl">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Don't worry, we have some great examples for you:
                </p>
                <div className="relative px-4 container mx-auto">
                  <div
                    className="scroll-snap-container overflow-hidden"
                    ref={placeholderScrollRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onScroll={handleScroll}
                  >
                    {placeholderPosters.map((poster, index) => (
                      <div
                        key={poster._id}
                        className={`scroll-snap-item card-appear card-appear-${
                          index + 1
                        }`}
                      >
                        <EnhancedPosterCard poster={poster} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative px-4 container mx-auto">
                <div
                  className="scroll-snap-container overflow-hidden"
                  ref={mainScrollRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onScroll={handleScroll}
                >
                  {displayPosters.map((poster, index) => (
                    <div
                      key={poster._id}
                      className={`scroll-snap-item card-appear card-appear-${
                        index + 1
                      }`}
                    >
                      <EnhancedPosterCard poster={poster} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Line */}
            <div className="flex justify-center mt-6 mb-4">
              <div className="progress-line relative w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                {/* Progress overlay */}
                <div
                  className="progress-fill absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-400 transition-all duration-300 ease-out shadow-lg"
                  style={{ width: `${scrollProgress}%` }}
                ></div>

                {/* Dot indicators */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-1">
                  {[...Array(8)].map((_, index) => {
                    // Calculate if this dot should be active based on progress
                    const dotPosition = (index / 7) * 100;
                    const isActive = scrollProgress >= dotPosition;

                    return (
                      <button
                        key={index}
                        className={`progress-dot relative z-10 rounded-full transition-all duration-300 ${
                          isActive
                            ? "active bg-white border-2 border-primary-600 w-4 h-4 shadow-md"
                            : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                        }`}
                        aria-label={`Scroll to slide ${index + 1}`}
                        onClick={() => {
                          // Calculate the percentage for this dot
                          const targetProgress = (index / 7) * 100;
                          setScrollProgress(targetProgress);

                          // Scroll to the appropriate position
                          const container =
                            isLoading || error
                              ? placeholderScrollRef.current
                              : mainScrollRef.current;
                          if (container) {
                            const targetPosition =
                              (container.scrollWidth - container.clientWidth) *
                              (targetProgress / 100);
                            container.scrollTo({
                              left: targetPosition,
                              behavior: "smooth",
                            });
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12 AllPoster">
          {" "}
          {/* Increased top margin to mt-12 */}
          <Button
            variant="primary"
            size="lg"
            className="px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300 btn-7 hover:transform hover:-translate-y-1"
            onClick={() => {
              // Use navigate instead of direct window.location change
              navigate("/login");
            }}
          >
            <span className="flex items-center space-x-2">
              {" "}
              {/* Changed ml-2 to space-x-2 for better spacing */}
              <span className="font-medium whitespace-nowrap">
                View All Posters
              </span>{" "}
              {/* Added font-medium */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /* Added hover animation */
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosters;
