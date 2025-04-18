import { Link } from "react-router-dom";
import Button from "../ui/Button";
import "./AboutSection.css";
import { FaPenNib, FaGlobe, FaCogs, FaChartLine } from "react-icons/fa";
import TrendingCategories from "./TrendingCategories";
import FeaturesSection from "./FeaturesSection";
import Marble from "./Marble";

const AboutSection = ({
  title = "Craft Stunning Publicity Posters",
  content = "Our platform empowers creators with professional  tools to design, share, and analyze impactful posters.\n From events to product launches, make your message stand out with our intuitive design system.",
  images = [
    "https://images.unsplash.com/photo-1508161773455-3ada8ed2bbec?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://plus.unsplash.com/premium_photo-1661616016088-1964194c7728?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  features = [
    {
      icon: "design",
      title: "Professional Templates",
      description: "500+ customizable templates for every occasion",
      stats: "New designs weekly",
      button: "Read More",
    },
    {
      icon: "share",
      title: "Multi-Platform Sharing",
      description: "One-click publishing to social networks",
      stats: "10+ integrated platforms",
      button: "Read More",
    },
    {
      icon: "customize",
      title: "Advanced Editor",
      description: "Pixel-perfect control over every element",
      stats: "100+ fonts & assets",
      button: "Read More",
    },
    {
      icon: "analytics",
      title: "Performance Tracking",
      description: "Real-time engagement analytics",
      stats: "15+ detailed metrics",
      button: "Read More",
    },
  ],
}) => {
  const iconMap = {
    design: <FaPenNib className="text-2xl text-indigo-600" />,
    share: <FaGlobe className="text-2xl text-indigo-600" />,
    customize: <FaCogs className="text-2xl text-indigo-600" />,
    analytics: <FaChartLine className="text-2xl text-indigo-600" />,
  };
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden aboutsec">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 ">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto ">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4 tracking-wide ">
              POSTER DESIGN REIMAGINED
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 whitespace-pre-line">
              {content}
            </p>
          </div>
          <div className="page-content">
            {features.map((card, index) => (
              <article key={index} className="card">
                <div className="content">
                  {/* <span className="icon">{iconMap[card.icon]}</span> */}
                  <h3 className="title">{card.title}</h3>
                  <p className="copy">{card.description}</p>
                  <h4 className="copy">{card.stats}</h4>
                  <button className="btn">
                    <h3>{card.button}</h3>
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="flex flex-col-reverse lg:flex-row gap-12">
            {/* Gallery */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative group rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
                    index === 1 ? "mt-8" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`Poster example ${index + 1}`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity duration-300">
                    <span className="text-white text-lg font-medium">
                      {index === 0
                        ? "Event Poster"
                        : index === 1
                        ? "Product Launch"
                        : "Brand Campaign"}
                    </span>
                  </div>
                </div>
              ))}

              {/* CTA Card */}
            </div>

            {/* Features with Floating Effect */}
          </div>
        </div>
      </section>
      <Marble />
      <FeaturesSection />
      <TrendingCategories />
    </>
  );
};

export default AboutSection;
