import React, { useEffect } from "react";
import "./About.css";
import AviGhibli from "../../assets/images/Avinash.jpg";
import Layout from "./Layout";

const About = () => {
  useEffect(() => {
    // Page cursors
    const cursorInit = () => {
      document
        .getElementsByTagName("body")[0]
        .addEventListener("mousemove", function (n) {
          const t = document.getElementById("cursor");
          const e = document.getElementById("cursor2");
          const i = document.getElementById("cursor3");
          if (t && e && i) {
            t.style.left = n.clientX + "px";
            t.style.top = n.clientY + "px";
            e.style.left = n.clientX + "px";
            e.style.top = n.clientY + "px";
            i.style.left = n.clientX + "px";
            i.style.top = n.clientY + "px";
          }
        });

      const t = document.getElementById("cursor");
      const e = document.getElementById("cursor2");
      const i = document.getElementById("cursor3");

      function n() {
        if (e) e.classList.add("hover");
        if (i) i.classList.add("hover");
      }

      function s() {
        if (e) e.classList.remove("hover");
        if (i) i.classList.remove("hover");
      }

      s();

      const r = document.querySelectorAll(".hover-target");
      for (let a = r.length - 1; a >= 0; a--) {
        o(r[a]);
      }

      function o(t) {
        t.addEventListener("mouseover", n);
        t.addEventListener("mouseout", s);
      }
    };

    cursorInit();

    // Event handlers
    const aboutText = document.querySelector(".about-text");
    const aboutClose = document.querySelector(".about-close");
    const contactText = document.querySelector(".contact-text");
    const contactClose = document.querySelector(".contact-close");
    const services = document.querySelector(".services");
    const servicesClose = document.querySelector(".services-close");
    const portfolio = document.querySelector(".portfolio");
    const portfolioClose = document.querySelector(".portfolio-close");
    const testimonials = document.querySelector(".testimonials");
    const testimonialsClose = document.querySelector(".testimonials-close");

    if (aboutText) {
      aboutText.addEventListener("click", () => {
        document.body.classList.add("about-on");
      });
    }

    if (aboutClose) {
      aboutClose.addEventListener("click", () => {
        document.body.classList.remove("about-on");
      });
    }

    if (contactText) {
      contactText.addEventListener("click", () => {
        document.body.classList.add("contact-on");
      });
    }

    if (contactClose) {
      contactClose.addEventListener("click", () => {
        document.body.classList.remove("contact-on");
      });
    }

    if (services) {
      services.addEventListener("click", () => {
        document.body.classList.add("services-on");
      });
    }

    if (servicesClose) {
      servicesClose.addEventListener("click", () => {
        document.body.classList.remove("services-on");
      });
    }

    if (portfolio) {
      portfolio.addEventListener("click", () => {
        document.body.classList.add("portfolio-on");
      });
    }

    if (portfolioClose) {
      portfolioClose.addEventListener("click", () => {
        document.body.classList.remove("portfolio-on");
      });
    }

    if (testimonials) {
      testimonials.addEventListener("click", () => {
        document.body.classList.add("testimonials-on");
      });
    }

    if (testimonialsClose) {
      testimonialsClose.addEventListener("click", () => {
        document.body.classList.remove("testimonials-on");
      });
    }

    return () => {
      // Cleanup event listeners
      if (aboutText) aboutText.removeEventListener("click", () => {});
      if (aboutClose) aboutClose.removeEventListener("click", () => {});
      if (contactText) contactText.removeEventListener("click", () => {});
      if (contactClose) contactClose.removeEventListener("click", () => {});
      if (services) services.removeEventListener("click", () => {});
      if (servicesClose) servicesClose.removeEventListener("click", () => {});
      if (portfolio) portfolio.removeEventListener("click", () => {});
      if (portfolioClose) portfolioClose.removeEventListener("click", () => {});
      if (testimonials) testimonials.removeEventListener("click", () => {});
      if (testimonialsClose)
        testimonialsClose.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <Layout>
      <div className="about-container">
        <div className="hero-section">
          <div className="about-text hover-target">about</div>
          <div className="contact-text hover-target">contact</div>
          <div className="section-center">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 text-center">
                  <h1>PublicityPoster</h1>
                </div>
                <div className="col-12 text-center mb-2">
                  <div className="dancing">advertising agency</div>
                </div>
                <div className="col-12 text-center mt-4 mt-lg-5">
                  <p>
                    <span className="services hover-target">services</span>
                    <span className="portfolio hover-target">portfolio</span>
                    <span className="testimonials hover-target">
                      testimonials
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <div className="about-close hover-target"></div>
          <div className="section-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 text-center">
                  <img src={AviGhibli} alt="PublicityPoster Team" />
                </div>
                <div className="col-lg-8 text-center mt-4">
                  <p>
                    "PublicityPoster is a creative advertising agency dedicated
                    to transforming brands into powerful stories that resonate
                    with audiences. We specialize in creating compelling
                    publicity campaigns, eye-catching poster designs, and
                    comprehensive marketing solutions that drive engagement and
                    deliver results. Our team combines artistic vision with
                    strategic thinking to help businesses connect with their
                    target audience effectively."
                  </p>
                </div>
                <div className="col-12 text-center">
                  <p>
                    <span>Founded by Avinash Kumar</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <div className="contact-close hover-target"></div>
          <div className="section-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 text-center">
                  <a
                    href="mailto:info@publicityposter.com"
                    className="hover-target"
                  >
                    info@publicityposter.com
                  </a>
                </div>
                <div className="col-12 text-center mt-3">
                  <a href="tel:+1234567890" className="hover-target">
                    +1 (234) 567-8900
                  </a>
                </div>
                <div className="col-12 text-center social mt-4">
                  <a href="#" className="hover-target">
                    instagram
                  </a>
                  <a href="#" className="hover-target">
                    linkedin
                  </a>
                  <a href="#" className="hover-target">
                    behance
                  </a>
                  <a href="#" className="hover-target">
                    dribbble
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <div className="services-close hover-target"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h3>Our Services</h3>
              </div>
              <div className="col-12 mt-3 text-center">
                <p>
                  <span>Creative Solutions for Modern Brands</span>
                </p>
              </div>
              <div className="col-md-6 col-lg-4 service-item">
                <div className="service-card">
                  <h4>Poster Design</h4>
                  <p>
                    Eye-catching promotional posters that capture attention and
                    communicate your message effectively.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 service-item">
                <div className="service-card">
                  <h4>Brand Identity</h4>
                  <p>
                    Complete brand development including logo design, color
                    schemes, and visual guidelines.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 service-item">
                <div className="service-card">
                  <h4>Digital Marketing</h4>
                  <p>
                    Comprehensive digital campaigns across social media, web,
                    and mobile platforms.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 service-item">
                <div className="service-card">
                  <h4>Print Advertising</h4>
                  <p>
                    Traditional print media campaigns including magazines,
                    newspapers, and outdoor advertising.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 service-item">
                <div className="service-card">
                  <h4>Web Design</h4>
                  <p>
                    Modern, responsive websites that showcase your brand and
                    convert visitors into customers.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 service-item">
                <div className="service-card">
                  <h4>Event Promotion</h4>
                  <p>
                    Complete event marketing solutions from concept to execution
                    and post-event analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="portfolio-section">
          <div className="portfolio-close hover-target"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h3>Our Work</h3>
              </div>
              <div className="col-12 mt-3 text-center">
                <p>
                  <span>Award-Winning Campaigns</span>
                </p>
              </div>
              <div className="col-12 text-center">
                <p>
                  Creative Excellence
                  <br />
                  Strategic Impact
                  <br />
                  Measurable Results
                  <br />
                  Client Satisfaction: 98%
                </p>
              </div>
              {[...Array(12)].map((_, i) => (
                <div key={`portfolio-${i}`} className="col-md-6 col-lg-4">
                  <div className="portfolio-item">
                    <img
                      src="http://www.ivang-design.com/svg-load/portfolio/photo-p.jpg"
                      alt={`Portfolio item ${i + 1}`}
                    />
                    <div className="portfolio-overlay">
                      <h5>Campaign {i + 1}</h5>
                      <p>Creative advertising solution</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="testimonials-section">
          <div className="testimonials-close hover-target"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h3>Client Testimonials</h3>
              </div>
              <div className="col-12 mt-3 text-center">
                <p>
                  <span>What Our Clients Say</span>
                </p>
              </div>
              <div className="col-lg-6 testimonial-item">
                <div className="testimonial-card">
                  <p>
                    "PublicityPoster transformed our brand image completely.
                    Their creative approach and attention to detail exceeded our
                    expectations."
                  </p>
                  <h5>Sarah Johnson</h5>
                  <span>CEO, TechStart Inc.</span>
                </div>
              </div>
              <div className="col-lg-6 testimonial-item">
                <div className="testimonial-card">
                  <p>
                    "The team's strategic thinking and creative execution helped
                    us achieve a 300% increase in brand awareness."
                  </p>
                  <h5>Michael Chen</h5>
                  <span>Marketing Director, GreenLife</span>
                </div>
              </div>
              <div className="col-lg-6 testimonial-item">
                <div className="testimonial-card">
                  <p>
                    "Professional, creative, and results-driven. PublicityPoster
                    is our go-to agency for all marketing needs."
                  </p>
                  <h5>Emily Rodriguez</h5>
                  <span>Founder, Artisan Crafts</span>
                </div>
              </div>
              <div className="col-lg-6 testimonial-item">
                <div className="testimonial-card">
                  <p>
                    "Their poster designs for our events consistently draw large
                    crowds. Exceptional work every time."
                  </p>
                  <h5>David Kim</h5>
                  <span>Event Manager, City Events</span>
                </div>
              </div>
              <div className="col-lg-6 testimonial-item">
                <div className="testimonial-card">
                  <p>
                    "PublicityPoster understands our vision and translates it
                    into powerful visual communications."
                  </p>
                  <h5>Lisa Wang</h5>
                  <span>Brand Manager, Fashion Forward</span>
                </div>
              </div>
              <div className="col-lg-6 testimonial-item">
                <div className="testimonial-card">
                  <p>
                    "Outstanding creativity and professionalism. They've helped
                    us win multiple industry awards."
                  </p>
                  <h5>James Thompson</h5>
                  <span>Creative Director, Studio X</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cursor" id="cursor"></div>
        <div className="cursor2" id="cursor2"></div>
        <div className="cursor3" id="cursor3"></div>

        <a
          href="https://publicityposter.com/"
          className="link-to-portfolio hover-target"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
    </Layout>
  );
};

export default About;
