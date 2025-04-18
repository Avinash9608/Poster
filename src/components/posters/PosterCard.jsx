import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const PosterCard = ({ poster = {}, onEdit, onDelete, isAdmin, isOwner }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Ensure poster has all required properties
  if (!poster || !poster.title || !poster.imageUrl) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 text-center">
        <p className="text-gray-500">Poster information unavailable</p>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Image */}
        <img
          src={poster.imageUrl}
          alt={poster.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Featured Badge */}
        {poster.isFeatured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
            Featured
          </div>
        )}

        {/* Creator Badge */}
        {poster.creator && (
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full z-10">
            By {poster.creator.name || "Unknown"}
          </div>
        )}

        {/* View Details Button (Mobile) */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center md:hidden">
          <Link
            to={`/posters/${poster._id}`}
            className="bg-white/90 backdrop-blur-sm text-blue-600 font-medium px-4 py-2 rounded-full text-sm shadow-md hover:bg-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {poster.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {poster.description}
        </p>

        <div className="flex justify-between items-center">
          {/* View Details Link (Desktop) */}
          <Link
            to={`/posters/${poster._id}`}
            className="hidden md:block text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline"
          >
            View Details
          </Link>

          {/* Admin/Owner Actions */}
          {(isAdmin || isOwner) && (
            <div className="flex space-x-2 ml-auto">
              <Button
                variant="light"
                size="sm"
                onClick={() => onEdit && onEdit(poster)}
                aria-label="Edit poster"
                className="hover:bg-blue-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-600"
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
  );
};

export default PosterCard;
