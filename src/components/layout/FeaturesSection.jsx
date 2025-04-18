// src/components/FeaturesSection.jsx
import React from "react";
import "./FeaturesSection.css";

const features = [
  {
    image:
      "https://images.unsplash.com/photo-1646060004183-363586cf4514?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Business Frame",
    description:
      "Provide unique brand identity creation for each customer, aligning with their product or...",
  },
  {
    image:
      "https://images.unsplash.com/photo-1646060004183-363586cf4514?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Digital business Card",
    description:
      "Access to exclusively designed digital business cards that showcase your brand and contact...",
  },
  {
    image:
      "https://images.unsplash.com/photo-1646060004183-363586cf4514?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg",
    title: "Collage Maker",
    description:
      "Collage Maker Creativity: Tips and Tools for Designing Stunning Visuals and Graphics on Your Own.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1646060004183-363586cf4514?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Make Your Video",
    description:
      "Make Your Video Creativity: Tips and Tools for Designing Stunning Visuals and Graphics on Your Own.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h1>Popular Features of Online Publicity Poster Application</h1>
      <h3 className="text-2xl font-bold mb-2">Join 15,000+ Creators</h3>
      <h4 className="text-sm mb-4 text-2xl font-bold mb-2">
        Start designing professional posters today
      </h4>
      <p>
        Publicity Poster comes packed with tons of features to help you perfect
        your photos. You can enhance photos, retouch portraits, remove
        backgrounds and apply effects. Take a look at our most popular
        application features.
      </p>
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div className="feature-card" key={idx}>
            <img src={feature.image} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <a href="#">Learn More</a>
          </div>
        ))}
      </div>
      <div className="view-more-btn">
        <button>View more →</button>
      </div>
    </section>
  );
};

export default FeaturesSection;
