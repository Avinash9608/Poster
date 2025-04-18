import { useState, useEffect } from "react";
import axios from "axios";
import HomeLayout from "../components/layout/HomeLayout";
import Hero from "../components/layout/EnhancedHero";
import FeaturedPosters from "../components/posters/FeaturedPosters";
import AboutSection from "../components/layout/EnhancedAboutSection";
import CallToAction from "../components/layout/EnhancedCallToAction";

const HomePage = () => {
  const [heroContent, setHeroContent] = useState({
    title: "Create and Share Amazing Publicity Posters",
    subtitle:
      "Design eye-catching posters for your events, products, and services",
  });
  const [featuredPosters, setFeaturedPosters] = useState([]);
  const [aboutContent, setAboutContent] = useState({
    title: "About Us",
    content:
      "We provide a platform for creating and sharing publicity posters for various purposes. Whether you need posters for events, products, or services, our platform has got you covered.",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured posters and website content
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch featured posters
        const postersRes = await axios.get("/api/posters/featured");
        setFeaturedPosters(postersRes.data);

        // Fetch hero content
        const heroRes = await axios.get("/api/content/hero");
        if (heroRes.data) {
          setHeroContent({
            title: heroRes.data.title,
            subtitle: heroRes.data.subtitle,
          });
        }

        // Fetch about content
        const aboutRes = await axios.get("/api/content/about");
        if (aboutRes.data) {
          setAboutContent({
            title: aboutRes.data.title,
            content: aboutRes.data.content,
          });
        }
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // For demo purposes, use placeholder data if API fails
  const placeholderPosters = [
    {
      _id: "1",
      title: "Summer Music Festival",
      description: "Join us for a weekend of amazing music and fun activities.",
      imageUrl:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
    },
    {
      _id: "2",
      title: "Tech Conference 2023",
      description: "The biggest tech event of the year with industry leaders.",
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
    },
    {
      _id: "3",
      title: "Art Exhibition",
      description: "Showcasing works from emerging and established artists.",
      imageUrl:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
    },
    {
      _id: "4",
      title: "Food Festival",
      description: "Taste cuisines from around the world in one place.",
      imageUrl:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isFeatured: true,
    },
  ];

  return (
    <HomeLayout>
      {/* Hero Section */}
      <Hero
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        backgroundImage="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      {/* Featured Posters Section */}
      <FeaturedPosters />

      {/* About Section */}
      <AboutSection title={aboutContent.title} content={aboutContent.content} />

      {/* Call to Action */}
      <CallToAction />
    </HomeLayout>
  );
};

export default HomePage;
