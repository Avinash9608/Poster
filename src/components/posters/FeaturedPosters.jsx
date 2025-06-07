import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PosterTemplates.css";
import SearchBar from "./SearchBar";
const PosterTemplates = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [userPosters, setUserPosters] = useState([]);
  const [loading, setLoading] = useState({
    templates: true,
    posters: true,
  });
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    category: "all",
  });

  // Fetch templates and user posters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [templatesRes, postersRes] = await Promise.all([
          axios.get(
            "https://publicityposterbackend.onrender.com/api/templates"
          ),
          user
            ? axios.get(
                "https://publicityposterbackend.onrender.com/api/posters/my-posters",
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
            : Promise.resolve({ data: [] }),
        ]);

        setTemplates(templatesRes.data);
        setFilteredTemplates(templatesRes.data);
        setUserPosters(postersRes.data);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error(err);
      } finally {
        setLoading({ templates: false, posters: false });
      }
    };

    fetchData();
  }, [user]);

  // Filter templates
  useEffect(() => {
    let filtered = [...templates];

    if (searchParams.searchTerm) {
      const term = searchParams.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (template) =>
          template.title.toLowerCase().includes(term) ||
          template.description.toLowerCase().includes(term) ||
          (template.category && template.category.toLowerCase().includes(term))
      );
    }

    if (searchParams.category !== "all") {
      filtered = filtered.filter(
        (template) => template.category === searchParams.category
      );
    }

    setFilteredTemplates(filtered);
  }, [templates, searchParams]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const openForm = (template) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedTemplate(template);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  if (loading.templates)
    return <div className="loading">Loading templates...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="templates-container">
      <h2 className="section-title">Choose a Template</h2>

      {/* <div className="search-controls">
        <input
          type="search"
          placeholder="Search templates..."
          value={searchParams.searchTerm}
          onChange={(e) =>
            handleSearch({ ...searchParams, searchTerm: e.target.value })
          }
          className="search-input"
        />
        <select
          value={searchParams.category}
          onChange={(e) =>
            handleSearch({ ...searchParams, category: e.target.value })
          }
          className="category-select"
        >
          <option value="all">All Categories</option>
          <option value="business">Business</option>
          <option value="event">Events</option>
          <option value="sale">Sales</option>
          <option value="promotion">Promotions</option>
        </select>
      </div> */}
      <SearchBar onSearch={handleSearch} />

      {filteredTemplates.length === 0 ? (
        <div className="no-results">
          <img
            src="/images/no-results.svg"
            alt="No results"
            className="no-results-img"
          />
          <p>No templates found matching your search criteria.</p>
        </div>
      ) : (
        <div className="templates-grid">
          {filteredTemplates.map((template) => (
            <div key={template._id} className="template-card">
              <div className="template-image-container">
                <img
                  src={template.imageUrl}
                  alt={template.title}
                  className="template-image"
                />
                <div className="template-overlay">
                  <h3 className="template-title">{template.title}</h3>
                  {template.category && (
                    <span className="template-category">
                      {template.category}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => openForm(template)}
                className="create-button"
              >
                <i className="fas fa-magic"></i> Create Poster
              </button>
            </div>
          ))}
        </div>
      )}

      {/* User's Poster History */}
      {user && (
        <div className="poster-history">
          <h3>Your Created Posters</h3>
          {loading.posters ? (
            <div className="loading">Loading your posters...</div>
          ) : userPosters.length === 0 ? (
            <p className="no-posters">You haven't created any posters yet.</p>
          ) : (
            <div className="history-grid">
              {userPosters.map((poster) => (
                <div key={poster._id} className="history-card">
                  <img
                    src={poster.finalPosterUrl}
                    alt={poster.businessName}
                    className="history-image"
                  />
                  <div className="history-details">
                    <p className="history-business">{poster.businessName}</p>
                    <p className="history-date">
                      {new Date(poster.createdAt).toLocaleDateString()}
                    </p>
                    <a
                      href={`https://wa.me/?text=Check%20out%20my%20poster:%20${encodeURIComponent(
                        poster.finalPosterUrl
                      )}`}
                      className="whatsapp-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-whatsapp"></i> Share
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showForm && (
        <>
          <div className="form-overlay" onClick={closeForm}></div>
          <div className="customize-form-container">
            <CustomizeForm
              template={selectedTemplate}
              onClose={closeForm}
              user={user}
              updatePosters={() => {
                axios
                  .get(
                    "https://publicityposterbackend.onrender.com/api/posters/my-posters",
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then((res) => setUserPosters(res.data))
                  .catch((err) => console.error(err));
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const CustomizeForm = ({ template, onClose, user, updatePosters }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    phoneNumber: user?.phoneNumber || "",
    logo: null,
    logoPreview: null,
  });
  const [generatedPoster, setGeneratedPoster] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!template || !template.imageUrl) {
      setError("Template data is missing or invalid");
      onClose();
    }
  }, [template, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: file,
          logoPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const savePosterToDatabase = async (posterUrl) => {
    try {
      const response = await axios.post(
        "https://publicityposterbackend.onrender.com/api/posters",
        {
          templateId: template._id,
          businessName: formData.businessName,
          phoneNumber: formData.phoneNumber,
          logoUrl: formData.logoPreview,
          finalPosterUrl: posterUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error saving poster:", err);
      throw err;
    }
  };

  const generatePoster = async () => {
    if (!template?.imageUrl) {
      setError("Template image is missing");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const templateImg = new Image();
      templateImg.crossOrigin = "Anonymous";
      templateImg.src = template.imageUrl;

      await new Promise((resolve, reject) => {
        templateImg.onload = resolve;
        templateImg.onerror = () => reject("Failed to load template image");
      });

      canvas.width = templateImg.width;
      canvas.height = templateImg.height;
      ctx.drawImage(templateImg, 0, 0);

      // Add business name (bottom left)
      if (formData.businessName) {
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.fillText(formData.businessName, 20, canvas.height - 20);
      }

      // Add phone number (bottom right)
      if (formData.phoneNumber) {
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "right";
        ctx.fillText(
          formData.phoneNumber,
          canvas.width - 20,
          canvas.height - 20
        );
      }

      // Add logo (top left)
      if (formData.logoPreview) {
        const logoImg = new Image();
        await new Promise((resolve, reject) => {
          logoImg.onload = resolve;
          logoImg.onerror = () => reject("Failed to load logo");
          logoImg.src = formData.logoPreview;
        });

        const logoWidth = 100;
        const logoHeight = (logoImg.height / logoImg.width) * logoWidth;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(15, 15, logoWidth + 10, logoHeight + 10);
        ctx.drawImage(logoImg, 20, 20, logoWidth, logoHeight);
      }

      const posterUrl = canvas.toDataURL("image/jpeg", 0.9);
      setGeneratedPoster(posterUrl);

      // Save to database
      await savePosterToDatabase(posterUrl);

      // Update posters list
      if (updatePosters) {
        updatePosters();
      }

      setSuccess(true);
    } catch (err) {
      console.error("Error generating poster:", err);
      setError(err.message || "Failed to generate poster");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPoster = () => {
    if (!generatedPoster) return;

    const link = document.createElement("a");
    link.download = `${formData.businessName || "poster"}-${Date.now()}.jpg`;
    link.href = generatedPoster;
    link.click();
  };

  if (error) {
    return (
      <div className="customize-form">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="customize-form">
      <button className="close-button" onClick={onClose}>
        ×
      </button>

      {success ? (
        <div className="success-container">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3>Poster Generated Successfully!</h3>

          <div className="poster-preview-container">
            <img
              src={generatedPoster}
              alt="Generated poster"
              className="final-poster"
            />
          </div>

          <p className="success-message">
            Your poster has been saved. You can download it below or share it
            via WhatsApp.
          </p>

          <div className="action-buttons">
            <button
              onClick={() => {
                setGeneratedPoster(null);
                setSuccess(false);
              }}
              className="edit-button"
            >
              <i className="fas fa-edit"></i> Edit Again
            </button>
            <button onClick={downloadPoster} className="download-button">
              <i className="fas fa-download"></i> Download
            </button>
            <a
              href={`https://wa.me/?text=Check%20out%20my%20new%20poster:%20${encodeURIComponent(
                formData.businessName
              )}%20${encodeURIComponent(generatedPoster)}`}
              className="whatsapp-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i> Share
            </a>
          </div>
        </div>
      ) : (
        <>
          <h3>Customize: {template?.title || "Poster"}</h3>

          <form className="FormOverlayx"
            onSubmit={(e) => {
              e.preventDefault();
              generatePoster();
            }}
          >
            <div className="form-group">
              <label>Business Name*</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                placeholder="Your business name"
              />
            </div>

            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Your contact number"
              />
            </div>

            <div className="form-group">
              <label>Business Logo (Optional)</label>
              <div className="file-upload-container">
                <label className="file-upload-label">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <span className="file-upload-button">
                    <i className="fas fa-upload"></i> Choose File
                  </span>
                  {formData.logoPreview ? "File selected" : "No file chosen"}
                </label>
                {formData.logoPreview && (
                  <img
                    src={formData.logoPreview}
                    alt="Logo preview"
                    className="logo-preview"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Generating...
                </>
              ) : (
                <>
                  <i className="fas fa-magic"></i> Generate Poster
                </>
              )}
            </button>
          </form>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default PosterTemplates;
