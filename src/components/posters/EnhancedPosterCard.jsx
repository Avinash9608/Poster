import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/EnhancedButton";
import "./FloatingCard.css";

const EnhancedPosterCard = ({
  poster = {},
  onEdit,
  onDelete,
  isAdmin,
  isOwner,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef(null);

  // Ensure poster has all required properties
  if (!poster || !poster.title || !poster.imageUrl) {
    return (
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden p-6 text-center animate-pulse-slow">
        <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  // Handle intersection observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`floating-card-container ${
        isLoaded ? "card-appear" : "opacity-0"
      }`}
    >
      <div
        className="floating-card tilt-card glow-on-hover group shimmer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/2] overflow-hidden image-zoom">
          {/* Image */}
          <img
            src={poster.imageUrl}
            alt={poster.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Featured Badge */}
          {poster.isFeatured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 animate-pulse-slow">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            </div>
          )}

          {/* Creator Badge */}
          {poster.creator && (
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full z-10 transition-transform duration-300 transform group-hover:translate-y-0 translate-y-0 sm:-translate-y-12 sm:group-hover:translate-y-0">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                {poster.creator.name || "Unknown"}
              </span>
            </div>
          )}

          {/* View Details Button (Visible on hover or mobile) */}
          <div className="absolute bottom-0 inset-x-0 p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
            <Link
              to={`/posters/${poster._id}`}
              className="bg-white/90 backdrop-blur-sm text-primary-600 font-medium px-4 py-2 rounded-full text-sm shadow-md hover:bg-white transition-colors w-full sm:w-auto text-center"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                View Details
              </span>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 card-content">
          <h3 className="text-xl font-bold font-display text-gray-800 mb-2 group-hover:text-primary-600 transition-colors truncate">
            {poster.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
            {poster.description}
          </p>

          <div className="flex justify-between items-center">
            {/* View Details Button with btn-7 style */}
            <Link to={`/posters/${poster._id}`}>
              <button
                className="btn-7"
                style={{ minWidth: "120px", height: "36px" }}
              >
                <span className="text-white flex items-center justify-center text-sm">
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
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
              </button>
            </Link>

            {/* Admin/Owner Actions */}
            {(isAdmin || isOwner) && (
              <div className="flex space-x-2 ml-auto">
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => onEdit && onEdit(poster)}
                  aria-label="Edit poster"
                  className="hover:bg-primary-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete && onDelete(poster._id)}
                  aria-label="Delete poster"
                  className="hover:bg-red-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPosterCard;
