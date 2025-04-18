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
    const travel = document.querySelector(".travel");
    const travelClose = document.querySelector(".travel-close");
    const wildlife = document.querySelector(".wildlife");
    const wildlifeClose = document.querySelector(".wildlife-close");
    const nature = document.querySelector(".nature");
    const natureClose = document.querySelector(".nature-close");

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

    if (travel) {
      travel.addEventListener("click", () => {
        document.body.classList.add("travel-on");
      });
    }

    if (travelClose) {
      travelClose.addEventListener("click", () => {
        document.body.classList.remove("travel-on");
      });
    }

    if (wildlife) {
      wildlife.addEventListener("click", () => {
        document.body.classList.add("wildlife-on");
      });
    }

    if (wildlifeClose) {
      wildlifeClose.addEventListener("click", () => {
        document.body.classList.remove("wildlife-on");
      });
    }

    if (nature) {
      nature.addEventListener("click", () => {
        document.body.classList.add("nature-on");
      });
    }

    if (natureClose) {
      natureClose.addEventListener("click", () => {
        document.body.classList.remove("nature-on");
      });
    }

    return () => {
      // Cleanup event listeners
      if (aboutText) aboutText.removeEventListener("click", () => {});
      if (aboutClose) aboutClose.removeEventListener("click", () => {});
      if (contactText) contactText.removeEventListener("click", () => {});
      if (contactClose) contactClose.removeEventListener("click", () => {});
      if (travel) travel.removeEventListener("click", () => {});
      if (travelClose) travelClose.removeEventListener("click", () => {});
      if (wildlife) wildlife.removeEventListener("click", () => {});
      if (wildlifeClose) wildlifeClose.removeEventListener("click", () => {});
      if (nature) nature.removeEventListener("click", () => {});
      if (natureClose) natureClose.removeEventListener("click", () => {});
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
                  <h1>Christian Arete</h1>
                </div>
                <div className="col-12 text-center mb-2">
                  <div className="dancing">photography</div>
                </div>
                <div className="col-12 text-center mt-4 mt-lg-5">
                  <p>
                    <span className="travel hover-target">travel</span>
                    <span className="wildlife hover-target">wildlife</span>
                    <span className="nature hover-target">nature</span>
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
                  <img src={AviGhibli} alt="" />
                </div>
                <div className="col-lg-8 text-center mt-4">
                  <p>
                    "As a seasoned software developer, I craft digital
                    experiences that captivate audiences. My specialty lies in
                    designing and building innovative websites, including
                    publicity poster platforms that showcase creativity and
                    flair. With a passion for coding and a keen eye for detail,
                    I bring ideas to life, empowering clients to reach their
                    target audience effectively."
                  </p>
                </div>
                <div className="col-12 text-center">
                  <p>
                    <span>Avinash Kumar</span>
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
                  <a href="#" className="hover-target">
                    arete@photography.com
                  </a>
                </div>
                <div className="col-12 text-center social mt-4">
                  <a href="#" className="hover-target">
                    instagram
                  </a>
                  <a href="#" className="hover-target">
                    flickr
                  </a>
                  <a href="#" className="hover-target">
                    facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="travel-section">
          <div className="travel-close hover-target"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h3>travel</h3>
              </div>
              <div className="col-12 mt-3 text-center">
                <p>
                  <span>Canon PowerShot S95</span>
                </p>
              </div>
              <div className="col-12 text-center">
                <p>
                  focal length: 22.5mm
                  <br />
                  aperture: ƒ/5.6
                  <br />
                  exposure time: 1/1000
                  <br />
                  ISO: 80
                </p>
              </div>
              {[...Array(12)].map((_, i) => (
                <div key={`travel-${i}`} className="col-md-6 col-lg-4">
                  <img
                    src="http://www.ivang-design.com/svg-load/portfolio/photo-p.jpg"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="wildlife-section">
          <div className="wildlife-close hover-target"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h3>wildlife</h3>
              </div>
              <div className="col-12 mt-3 text-center">
                <p>
                  <span>Canon PowerShot S95</span>
                </p>
              </div>
              <div className="col-12 text-center">
                <p>
                  focal length: 22.5mm
                  <br />
                  aperture: ƒ/5.6
                  <br />
                  exposure time: 1/1000
                  <br />
                  ISO: 80
                </p>
              </div>
              {[...Array(12)].map((_, i) => (
                <div key={`wildlife-${i}`} className="col-md-6 col-lg-4">
                  <img
                    src="http://www.ivang-design.com/svg-load/portfolio/photo-p.jpg"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="nature-section">
          <div className="nature-close hover-target"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h3>nature</h3>
              </div>
              <div className="col-12 mt-3 text-center">
                <p>
                  <span>Canon PowerShot S95</span>
                </p>
              </div>
              <div className="col-12 text-center">
                <p>
                  focal length: 22.5mm
                  <br />
                  aperture: ƒ/5.6
                  <br />
                  exposure time: 1/1000
                  <br />
                  ISO: 80
                </p>
              </div>
              {[...Array(12)].map((_, i) => (
                <div key={`nature-${i}`} className="col-md-6 col-lg-4">
                  <img
                    src="http://www.ivang-design.com/svg-load/portfolio/photo-p.jpg"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cursor" id="cursor"></div>
        <div className="cursor2" id="cursor2"></div>
        <div className="cursor3" id="cursor3"></div>

        <a
          href="https://front.codes/"
          className="link-to-portfolio hover-target"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
    </Layout>
  );
};

export default About;
