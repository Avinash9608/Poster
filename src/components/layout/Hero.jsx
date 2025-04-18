import { Link } from "react-router-dom";
import Button from "../ui/Button";

const Hero = ({
  title = "Create and Share Amazing Publicity Posters",
  subtitle = "Design eye-catching posters for your events, products, and services",
  backgroundImage = "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  primaryButtonText = "Get Started",
  primaryButtonLink = "/register",
  secondaryButtonText = "Browse Posters",
  secondaryButtonLink = "/posters",
}) => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto animate-fade-in-delay">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-delay-2">
          <Link to={primaryButtonLink}>
            <Button size="lg" className="w-full sm:w-auto">
              {primaryButtonText}
            </Button>
          </Link>
          <Link to={secondaryButtonLink}>
            <Button variant="light" size="lg" className="w-full sm:w-auto">
              {secondaryButtonText}
            </Button>
          </Link>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
