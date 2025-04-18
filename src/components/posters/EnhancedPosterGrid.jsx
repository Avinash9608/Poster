import { useState, useEffect, useRef } from 'react';
import EnhancedPosterCard from './EnhancedPosterCard';

const EnhancedPosterGrid = ({ 
  posters = [], 
  onEdit, 
  onDelete, 
  isAdmin = false, 
  currentUserId = null,
  title = "Posters",
  subtitle = "Browse our collection of amazing posters",
  showFilters = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredPosters, setFilteredPosters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const gridRef = useRef(null);

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

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  // Filter and sort posters
  useEffect(() => {
    let result = [...posters];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(poster => 
        poster.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        poster.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterBy !== 'all') {
      if (filterBy === 'featured') {
        result = result.filter(poster => poster.isFeatured);
      } else {
        // Add more filters as needed
      }
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'title-desc':
          return (b.title || '').localeCompare(a.title || '');
        default:
          return 0;
      }
    });
    
    setFilteredPosters(result);
  }, [posters, searchTerm, sortBy, filterBy]);

  if (!posters || posters.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <div className="max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No posters found</h3>
          <p className="mt-2 text-gray-500">We couldn't find any posters matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={gridRef} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search posters..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <label htmlFor="filter" className="sr-only">Filter</label>
                <select
                  id="filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="all">All Posters</option>
                  <option value="featured">Featured Only</option>
                  {/* Add more filter options as needed */}
                </select>
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <label htmlFor="sort" className="sr-only">Sort</label>
                <select
                  id="sort"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredPosters.length} of {posters.length} posters
            {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
          </div>
        </div>
      )}
      
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filteredPosters.map((poster, index) => (
          <div 
            key={poster._id || index} 
            className="transition-all duration-500"
            style={{ 
              transitionDelay: `${(index % 4) * 100}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <EnhancedPosterCard 
              poster={poster} 
              onEdit={onEdit} 
              onDelete={onDelete}
              isAdmin={isAdmin}
              isOwner={currentUserId && poster.creator && poster.creator._id === currentUserId}
            />
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredPosters.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl mt-8">
          <div className="max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No matching posters</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            {searchTerm && (
              <button 
                className="mt-4 text-primary-600 hover:text-primary-800 font-medium"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedPosterGrid;
