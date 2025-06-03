import { useState, useEffect } from "react";
import "./SearchBar.css";

const categories = [
  { id: "all", name: "All", icon: "fa-th-large" },
  { id: "Events", name: "Events", icon: "fa-calendar-alt" },
  { id: "concerts", name: "Concerts", icon: "fa-music" },
  { id: "exhibitions", name: "Exhibitions", icon: "fa-palette" },
  { id: "conferences", name: "Conferences", icon: "fa-users" },
  { id: "workshops", name: "Workshops", icon: "fa-tools" },
];

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isFocused, setIsFocused] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Handle search with debounce
  useEffect(() => {
    // Only set up the debounce if we have a search term or active category
    if (searchTerm || activeCategory !== "all") {
      // Clear any existing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      // Set a new timeout
      const timeout = setTimeout(() => {
        if (onSearch) {
          onSearch({ searchTerm, category: activeCategory });
        }
      }, 300); // 300ms debounce

      setTypingTimeout(timeout);

      // Cleanup on unmount
      return () => {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
      };
    }
  }, [searchTerm, activeCategory]); // Removed onSearch from dependencies

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ searchTerm, category: activeCategory });
    }
  };

  const handleCategoryClick = (categoryId) => {
    // Only update if the category has changed
    if (categoryId !== activeCategory) {
      setActiveCategory(categoryId);

      // Directly call onSearch instead of relying on the effect
      if (onSearch) {
        onSearch({ searchTerm, category: categoryId });
      }
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleClearSearch = () => {
    // Only clear if there's something to clear
    if (searchTerm) {
      setSearchTerm("");

      // Directly call onSearch instead of relying on the effect
      if (onSearch) {
        onSearch({ searchTerm: "", category: activeCategory });
      }
    }
  };

  return (
    <div className="search-container ">
      <section className="search-workshop ">
        <form onSubmit={handleSubmit} className={isFocused ? "focused" : ""}>
          <input
            type="search"
            placeholder="Search for posters, events, exhibitions and more..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            aria-label="Search for posters"
          />
          {searchTerm && (
            <span
              className="clear-search"
              onClick={handleClearSearch}
              title="Clear search"
            >
              <i className="fas fa-times-circle"></i>
            </span>
          )}
          <button type="submit">
            <i className="fas fa-search mr-2"></i>
            Search
          </button>
        </form>
      </section>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
            aria-label={`Filter by ${category.name}`}
            title={`Filter by ${category.name}`}
          >
            <i className={`fas ${category.icon} mr-2`}></i>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

// import { useState, useEffect } from "react";
// import "./SearchBar.css";

// const categories = [
//   { id: "all", name: "All", icon: "fa-th-large" },
//   { id: "Events", name: "Events", icon: "fa-calendar-alt" },
//   { id: "concerts", name: "Concerts", icon: "fa-music" },
//   { id: "exhibitions", name: "Exhibitions", icon: "fa-palette" },
//   { id: "conferences", name: "Conferences", icon: "fa-users" },
//   { id: "workshops", name: "Workshops", icon: "fa-tools" },
// ];

// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   useEffect(() => {
//     onSearch({ searchTerm, category: selectedCategory });
//   }, [searchTerm, selectedCategory, onSearch]);

//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         className="search-input"
//         placeholder="Search templates..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div className="category-buttons">
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             className={`category-button ${
//               selectedCategory === cat.id ? "active" : ""
//             }`}
//             onClick={() => setSelectedCategory(cat.id)}
//           >
//             <i className={`fas ${cat.icon}`}></i> {cat.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
