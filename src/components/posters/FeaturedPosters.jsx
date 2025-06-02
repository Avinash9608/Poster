import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EnhancedPosterCard from "./EnhancedPosterCard";
import Button from "../ui/EnhancedButton";
import SearchBar from "./SearchBar";
import "./FloatingCard.css";

const FeaturedPosters = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
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
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch templates from backend
  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/templates");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setTemplates(Array.isArray(data) ? data : []);
      setFilteredTemplates(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching templates:", err);
      setError("Failed to fetch templates. Please try again later.");
      setTemplates([]);
      setFilteredTemplates([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setUser(response.data);
      } catch (error) {
        console.log("User not logged in");
      }
    };
    fetchUser();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (showAllPosters) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
      return;
    }

    const initializeScroll = () => {
      const container =
        isLoading || error
          ? placeholderScrollRef.current
          : mainScrollRef.current;
      if (container) {
        container.scrollLeft = 0;
        setScrollProgress(0);
      }
    };

    initializeScroll();

    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      autoScrollIntervalRef.current = setInterval(() => {
        if (!isPaused) {
          const container =
            isLoading || error
              ? placeholderScrollRef.current
              : mainScrollRef.current;
          if (container) {
            const maxScroll = container.scrollWidth - container.clientWidth;
            const currentScroll = container.scrollLeft;
            const currentProgress = (currentScroll / maxScroll) * 100;
            const isAtEnd = currentProgress >= 95;

            if (isAtEnd) {
              container.scrollTo({ left: 0, behavior: "smooth" });
              setScrollProgress(0);
            } else {
              const nextScrollPosition = currentScroll + 300;
              const nextProgress = Math.min(
                100,
                (nextScrollPosition / maxScroll) * 100
              );
              container.scrollTo({
                left: nextScrollPosition,
                behavior: "smooth",
              });
              setScrollProgress(nextProgress);
            }
          }
        }
      }, 2000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isLoading, error, isPaused, showAllPosters]);

  // Filter templates based on search parameters
  useEffect(() => {
    try {
      let filtered = Array.isArray(templates) ? [...templates] : [];

      if (searchParams.searchTerm) {
        const term = searchParams.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (template) =>
            template &&
            template.title &&
            template.description &&
            (template.title.toLowerCase().includes(term) ||
              template.description.toLowerCase().includes(term))
        );
      }

      if (searchParams.category !== "all") {
        filtered = filtered.filter(
          (template) => template && template.category === searchParams.category
        );
      }

      setFilteredTemplates(filtered);
    } catch (error) {
      console.error("Error filtering templates:", error);
      setFilteredTemplates([]);
    }
  }, [templates, searchParams]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleCreatePoster = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/create-poster");
  };

  const renderTemplates = () => {
    const templatesToRender = Array.isArray(filteredTemplates)
      ? filteredTemplates
      : [];

    if (isLoading) {
      return [...Array(8)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ));
    }

    if (error) {
      return (
        <div className="col-span-full text-center py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 mx-auto max-w-2xl">
            <div className="flex items-center justify-center">
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
        </div>
      );
    }

    if (templatesToRender.length === 0) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-600">
            No templates found matching your criteria.
          </p>
        </div>
      );
    }

    return templatesToRender.map((template) => (
      <div
        key={template._id}
        className="card-appear"
        style={{ animationDelay: `${Math.random() * 0.5}s` }}
      >
        <EnhancedPosterCard poster={template} />
      </div>
    ));
  };

  return (
    <section
      id="featured-posters"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="mb-3">
            <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full">
              TEMPLATE COLLECTION
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4 relative inline-block">
            Poster Templates
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-0"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Choose from our professionally designed templates to create your
            perfect poster.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {showAllPosters ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {renderTemplates()}
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
                <p className="mt-4 text-gray-500 font-medium">
                  Loading templates...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 mx-auto max-w-2xl">
                  <div className="flex items-center justify-center">
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
              </div>
            ) : (
              <div className="relative px-4 container mx-auto">
                <div
                  className="scroll-snap-container overflow-hidden"
                  ref={mainScrollRef}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setTimeout(() => setIsPaused(false), 1000)}
                  onScroll={(e) => {
                    const container = e.currentTarget;
                    const scrollPosition = container.scrollLeft;
                    const maxScroll =
                      container.scrollWidth - container.clientWidth;
                    const progress = Math.min(
                      100,
                      Math.max(0, (scrollPosition / maxScroll) * 100)
                    );
                    if (Math.abs(progress - scrollProgress) > 1) {
                      setScrollProgress(progress);
                    }
                  }}
                >
                  {Array.isArray(filteredTemplates) &&
                    filteredTemplates.map((template, index) => (
                      <div
                        key={template._id}
                        className={`scroll-snap-item card-appear card-appear-${
                          index + 1
                        }`}
                      >
                        <EnhancedPosterCard poster={template} />
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-6 mb-4">
              <div className="progress-line relative w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="progress-fill absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-400 transition-all duration-300 ease-out shadow-lg"
                  style={{ width: `${scrollProgress}%` }}
                ></div>

                <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-1">
                  {[...Array(8)].map((_, index) => {
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
                          const targetProgress = (index / 7) * 100;
                          setScrollProgress(targetProgress);
                          const container = mainScrollRef.current;
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

        <div className="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            className="px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300 btn-7 hover:transform hover:-translate-y-1"
            onClick={handleCreatePoster}
          >
            <span className="flex items-center space-x-2">
              <span className="font-medium whitespace-nowrap">
                Create Own Poster
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
