import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CallToAction = ({
  title = 'Ready to Create Your Own Poster?',
  subtitle = 'Join our community and start creating eye-catching publicity posters today.',
  primaryButtonText = 'Sign Up Now',
  primaryButtonLink = '/register',
  backgroundImage = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
}) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        ></div>
        <div className="absolute inset-0 bg-blue-900/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            {subtitle}
          </p>
          <Link to={primaryButtonLink}>
            <Button 
              variant="light" 
              size="lg" 
              className="px-8 py-3 text-blue-600 hover:text-blue-700 font-bold"
            >
              {primaryButtonText}
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>
    </section>
  );
};

export default CallToAction;
