import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import AuthContext from '../../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  
  const { login, isLoading, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear errors when user types
    if (formError) setFormError('');
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (!formData.email || !formData.password) {
        setFormError('Please fill in all fields');
        return;
      }
      
      // Login user
      await login(formData.email, formData.password);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by context
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(formError || error) && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{formError || error}</p>
        </div>
      )}
      
      <Input
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />
      
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
            Forgot your password?
          </Link>
        </div>
      </div>
      
      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
