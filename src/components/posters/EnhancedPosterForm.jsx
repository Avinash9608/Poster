import { useState, useEffect } from 'react';
import Button from '../ui/EnhancedButton';

const EnhancedPosterForm = ({ 
  poster, 
  onSubmit, 
  isLoading,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    isPublic: true,
    isFeatured: false
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');

  // If editing, populate form with poster data
  useEffect(() => {
    if (poster) {
      setFormData({
        title: poster.title || '',
        description: poster.description || '',
        imageUrl: poster.imageUrl || '',
        isPublic: poster.isPublic !== undefined ? poster.isPublic : true,
        isFeatured: poster.isFeatured || false
      });
      setPreviewUrl(poster.imageUrl || '');
    }
  }, [poster]);

  // Update preview when imageUrl changes
  useEffect(() => {
    if (formData.imageUrl) {
      setPreviewUrl(formData.imageUrl);
    }
  }, [formData.imageUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Sample image URLs for quick selection
  const sampleImages = [
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-primary-600 to-secondary-700 text-white">
        <h2 className="text-xl font-bold">{poster ? 'Edit Poster' : 'Create New Poster'}</h2>
        <p className="text-blue-100 mt-1">
          {poster ? 'Update your poster information below' : 'Fill in the details to create a new poster'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter poster title"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter poster description"
                rows={5}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                className={`w-full px-4 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.imageUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>
              )}
              
              {/* Sample Images */}
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Or choose a sample image:</p>
                <div className="grid grid-cols-4 gap-2">
                  {sampleImages.map((url, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`relative rounded-md overflow-hidden h-16 border-2 ${formData.imageUrl === url ? 'border-primary-500' : 'border-gray-200'} hover:border-primary-400 transition-colors duration-200`}
                      onClick={() => setFormData(prev => ({ ...prev, imageUrl: url }))}
                    >
                      <img 
                        src={url} 
                        alt={`Sample ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      {formData.imageUrl === url && (
                        <div className="absolute inset-0 bg-primary-500 bg-opacity-20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Visibility Options */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <input
                  id="isPublic"
                  name="isPublic"
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                  Make this poster public
                </label>
              </div>
              
              {/* Featured Option (Admin only) */}
              <div className="flex items-center">
                <input
                  id="isFeatured"
                  name="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  disabled={!poster?.isAdmin} // Only admins can set featured status
                />
                <label 
                  htmlFor="isFeatured" 
                  className={`ml-2 block text-sm ${poster?.isAdmin ? 'text-gray-700' : 'text-gray-400'}`}
                >
                  Feature this poster on homepage
                  {!poster?.isAdmin && (
                    <span className="ml-1 text-xs text-gray-500">(Admin only)</span>
                  )}
                </label>
              </div>
            </div>
          </div>
          
          {/* Preview Column */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
              
              {previewUrl ? (
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={() => setPreviewUrl('/placeholder-image.jpg')}
                  />
                  
                  {/* Preview Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white text-lg font-bold truncate">{formData.title || 'Poster Title'}</h4>
                      <p className="text-gray-200 text-sm line-clamp-2">{formData.description || 'Poster description will appear here.'}</p>
                    </div>
                  </div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-2 right-2 flex flex-col space-y-2">
                    {!formData.isPublic && (
                      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                        Private
                      </span>
                    )}
                    {formData.isFeatured && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              <p className="mt-3 text-xs text-gray-500">
                This is how your poster will appear on the website.
              </p>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="mt-8 flex justify-end space-x-3">
          {onCancel && (
            <Button
              type="button"
              variant="light"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              poster ? 'Update Poster' : 'Create Poster'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedPosterForm;
