import React, { useState } from "react";
import "./Contact.css";
import Layout from "./Layout";

const Contact = () => {
  const [flipCard, setFlipCard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const toggleFlip = () => {
    setFlipCard(!flipCard);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    toggleFlip(); // Close the envelope after submission
  };

  return (
    <Layout>
      <div className="contact-container">
        <div
          className={`flip-card ${flipCard ? "active" : ""}`}
          onClick={toggleFlip}
        >
          {flipCard ? "Reset" : "Animate"}
        </div>

        <div className="contact-wrapper">
          <div className={`envelope ${flipCard ? "active" : ""}`}>
            <div className="back paper"></div>
            <div className="content">
              <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                  <div className="top-wrapper">
                    <div className="input">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div
                    className={`bottom-wrapper ${flipCard ? "flipped" : ""}`}
                  >
                    <div className="input">
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input">
                      <label>Message</label>
                      <textarea
                        rows="5"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="submit">
                      <button type="submit" className="submit-card">
                        Send Mail
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="front paper"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
