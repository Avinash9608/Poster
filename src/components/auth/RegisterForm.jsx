import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import AuthContext from '../../context/AuthContext';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');
  
  const { register, isLoading, error, clearError } = useContext(AuthContext);
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
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setFormError('Please fill in all fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match');
        return;
      }
      
      if (formData.password.length < 6) {
        setFormError('Password must be at least 6 characters');
        return;
      }
      
      // Register user
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
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
        label="Full Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        required
      />
      
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
        placeholder="Create a password"
        required
      />
      
      <Input
        label="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        required
      />
      
      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
