import React from 'react';

const TemplateSelector = ({ templates, selectedTemplate, onSelect }) => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedTemplate.id === template.id ? 'ring-4 ring-blue-500 scale-105' : 'hover:scale-105'
            }`}
            onClick={() => onSelect(template)}
            role="button"
            tabIndex="0"
            aria-label={`Select ${template.name} template`}
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg h-64">
              {template.type === 'parallax' ? (
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${template.previewImage})`,
                    backgroundColor: template.backgroundColor
                  }}
                >
                  <div className="absolute inset-0  bg-opacity-30 flex flex-col justify-end p-4">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">{template.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm">
                          <p className="font-medium" style={{ fontFamily: template.titleFont }}>
                            {template.title}
                          </p>
                          <p className="text-xs opacity-80">{template.description}</p>
                        </div>
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          PARALLAX
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <img 
                    src={template.previewImage} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0  flex flex-col justify-end p-4">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">{template.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm">
                          <p className="font-medium">{template.title}</p>
                          <p className="text-xs opacity-80">{template.description}</p>
                        </div>
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          PREVIEW
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {selectedTemplate.id === template.id && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;