import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/EnhancedButton';

const EnhancedPosterDetail = ({
  poster = {},
  isLoading = false,
  error = null,
  onDelete,
  isOwner = false,
  isAdmin = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const detailRef = useRef(null);
  const navigate = useNavigate();

  // Handle intersection observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (detailRef.current) {
      observer.observe(detailRef.current);
    }

    return () => {
      if (detailRef.current) {
        observer.unobserve(detailRef.current);
      }
    };
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return <PosterDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
            <div className="mt-4">
              <Button
                variant="light"
                size="sm"
                onClick={() => navigate('/posters')}
              >
                Back to Posters
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!poster || !poster._id) {
    return (
      <div className="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Poster not found</h3>
        <p className="mt-2 text-gray-500">The poster you're looking for doesn't exist or has been removed.</p>
        <div className="mt-6">
          <Button
            variant="primary"
            onClick={() => navigate('/posters')}
          >
            Browse All Posters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={detailRef} 
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Poster Image */}
          <div className="md:w-1/2 relative">
            <div className="aspect-[3/4] relative overflow-hidden group">
              <img 
                src={poster.imageUrl} 
                alt={poster.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {poster.isFeatured && (
                  <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                    Featured
                  </span>
                )}
                {!poster.isPublic && (
                  <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                    Private
                  </span>
                )}
              </div>
              
              {/* Share Button */}
              <button 
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                aria-label="Share poster"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Poster Details */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                {/* Category Tag */}
                {poster.category && (
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-md mb-2">
                    {poster.category}
                  </span>
                )}
                
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {poster.title}
                </h1>
                
                {/* Creator Info */}
                {poster.creator && (
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-sm">
                      {poster.creator.name ? poster.creator.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-900">
                        {poster.creator.name || 'Unknown Creator'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Created on {formatDate(poster.createdAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action Buttons for Owner/Admin */}
              {(isOwner || isAdmin) && (
                <div className="flex space-x-2">
                  <Link to={`/posters/edit/${poster._id}`}>
                    <Button
                      variant="light"
                      size="sm"
                      className="flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    className="flex items-center"
                    onClick={() => setShowConfirmDelete(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </Button>
                </div>
              )}
            </div>
            
            {/* Description */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {poster.description}
              </p>
            </div>
            
            {/* Additional Details */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Dimensions</p>
                <p className="font-medium text-gray-900">{poster.dimensions || 'Standard'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Format</p>
                <p className="font-medium text-gray-900">{poster.format || 'Digital'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Downloads</p>
                <p className="font-medium text-gray-900">{poster.downloads || 0}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                <p className="font-medium text-gray-900">{formatDate(poster.updatedAt)}</p>
              </div>
            </div>
            
            {/* Tags */}
            {poster.tags && poster.tags.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {poster.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-md hover:bg-gray-200 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                className="flex-1 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Poster
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="flex-1 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share Poster
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Posters Section */}
      {poster.relatedPosters && poster.relatedPosters.length > 0 && (
        <div className={`mt-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {poster.relatedPosters.map((relatedPoster) => (
              <div 
                key={relatedPoster._id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Link to={`/posters/${relatedPoster._id}`}>
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={relatedPoster.imageUrl} 
                      alt={relatedPoster.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold">{relatedPoster.title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Poster</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete "{poster.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <Button
                  variant="light"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    onDelete(poster._id);
                    setShowConfirmDelete(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Loading Skeleton
const PosterDetailSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="aspect-[3/4] bg-gray-200"></div>
        </div>
        <div className="md:w-1/2 p-6 md:p-8">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="ml-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-32 mt-1"></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded-lg">
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="h-12 bg-gray-200 rounded flex-1"></div>
            <div className="h-12 bg-gray-200 rounded flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPosterDetail;
