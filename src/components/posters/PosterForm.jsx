import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const PosterForm = ({ poster, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    isPublic: true
  });

  // If editing, populate form with poster data
  useEffect(() => {
    if (poster) {
      setFormData({
        title: poster.title || '',
        description: poster.description || '',
        imageUrl: poster.imageUrl || '',
        isPublic: poster.isPublic !== undefined ? poster.isPublic : true
      });
    }
  }, [poster]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter poster title"
        required
      />
      
      <div className="mb-4">
        <label 
          htmlFor="description" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter poster description"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <Input
        label="Image URL"
        id="imageUrl"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Enter image URL"
        required
      />
      
      <div className="mb-4 flex items-center">
        <input
          id="isPublic"
          name="isPublic"
          type="checkbox"
          checked={formData.isPublic}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label 
          htmlFor="isPublic" 
          className="ml-2 block text-sm text-gray-700"
        >
          Make this poster public
        </label>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : poster ? 'Update Poster' : 'Create Poster'}
        </Button>
      </div>
    </form>
  );
};

export default PosterForm;
