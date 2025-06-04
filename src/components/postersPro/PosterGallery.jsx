import React from 'react';
import { Link } from 'react-router-dom';

const PosterGallery = ({ posters, templates }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Your Posters</h1>
        <Link 
          to="/design" 
          className="flex items-center gap-1 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          aria-label="Create new poster"
        >
          <span>+</span> Create New Poster
        </Link>
      </div>

      {posters.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No posters yet</h2>
          <p className="text-gray-600 max-w-md mx-auto">Create your first poster by clicking the button above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
          {posters.map((poster, index) => (
            <div key={index} className="group">
              <div 
                className="h-80 rounded-xl relative overflow-hidden shadow-md group-hover:shadow-lg transition-shadow"
                style={{ 
                  backgroundColor: poster.template.backgroundColor,
                  backgroundImage: poster.backgroundImage ? `url(${poster.backgroundImage})` : 
                                poster.template.previewImage ? `url(${poster.template.previewImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backgroundColor: poster.template.overlayColor || 'rgba(0,0,0,0.4)'
                  }}
                ></div>
                
                <div className="absolute" style={poster.template.textPosition}>
                  <h2 
                    className="poster-title font-bold"
                    style={{ 
                      color: poster.template.titleColor,
                      fontFamily: poster.template.titleFont,
                      fontSize: poster.template.titleSize,
                      textTransform: poster.template.titleStyle
                    }}
                  >
                    {poster.title}
                  </h2>
                  <p 
                    className="poster-description"
                    style={{ 
                      color: poster.template.descColor,
                      fontFamily: poster.template.descFont,
                      fontSize: poster.template.descSize,
                      textTransform: poster.template.descStyle
                    }}
                  >
                    {poster.description}
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center">
                  <span 
                    className="text-sm"
                    style={{
                      color: poster.template.footerColor,
                      fontSize: poster.template.footerSize
                    }}
                  >
                    {poster.footerLeft}
                  </span>
                  <span 
                    className="text-sm"
                    style={{
                      color: poster.template.footerColor,
                      fontSize: poster.template.footerSize
                    }}
                  >
                    {poster.footerRight}
                  </span>
                </div>
              </div>
              <Link 
                to="/design" 
                className="mt-2 block text-center text-blue-600 hover:text-blue-800"
                aria-label={`Edit ${poster.title} poster`}
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Your Templates</h1>
          <Link 
            to="/template-editor" 
            className="flex items-center gap-1 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            aria-label="Create new template"
          >
            <span>+</span> Create New Template
          </Link>
        </div>

        {templates.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No custom templates</h2>
            <p className="text-gray-600 max-w-md mx-auto">Create your first template by clicking the button above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
            {templates.map((template, index) => (
              <Link to="/design" key={index} className="group">
                <div 
                  className="h-48 rounded-xl relative overflow-hidden shadow-md group-hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: template.backgroundColor }}
                >
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold"
                       style={{ backgroundColor: template.logoColor }}>
                    {template.logoText}
                  </div>
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-3/4 h-1/3 rounded-md"
                       style={{ backgroundColor: template.imageColor }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 text-center">
                    <div className="h-4 rounded mb-2 mx-auto"
                         style={{ backgroundColor: template.titleColor, width: '80%' }}></div>
                    <div className="h-3 rounded mx-auto"
                         style={{ backgroundColor: template.descColor, width: '60%' }}></div>
                  </div>
                  {template.footerPosition && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4/5">
                      <div className="h-2 rounded mx-auto"
                           style={{ backgroundColor: template.footerColor, width: '90%' }}></div>
                    </div>
                  )}
                </div>
                <p className="text-center mt-2 font-medium text-gray-700">{template.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PosterGallery;