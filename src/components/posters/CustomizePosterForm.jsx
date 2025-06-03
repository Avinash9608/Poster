import { useState, useRef } from "react";
import Button from "../ui/EnhancedButton";

const CustomizePosterForm = ({ template, onClose }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    phoneNumber: "",
    logo: null,
    logoPreview: null,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Add business name
        if (formData.businessName) {
          ctx.font = "bold 24px Arial";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "right";
          ctx.fillText(
            formData.businessName,
            canvas.width - 20,
            canvas.height - 50
          );
        }

        // Add phone number
        if (formData.phoneNumber) {
          ctx.font = "18px Arial";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "right";
          ctx.fillText(
            formData.phoneNumber,
            canvas.width - 20,
            canvas.height - 20
          );
        }

        // Add logo
        if (formData.logoPreview) {
          const logoImg = new Image();
          logoImg.onload = () => {
            const logoHeight = (100 / logoImg.width) * logoImg.height;
            ctx.drawImage(logoImg, 20, 20, 100, logoHeight);
            completeGeneration(canvas);
          };
          logoImg.src = formData.logoPreview;
        } else {
          completeGeneration(canvas);
        }
      };

      img.src = template.imageUrl;
    } catch (error) {
      console.error("Error generating poster:", error);
      setIsGenerating(false);
    }
  };

  const completeGeneration = (canvas) => {
    const finalImage = canvas.toDataURL("image/jpeg", 0.9);
    downloadImage(finalImage);
    setShowSuccess(true);
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
    }, 1500);
  };

  const downloadImage = (imageData) => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = `poster-${template.title}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div
        className={`bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 ${
          showSuccess ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Customize Your Poster
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isGenerating}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="Your business name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="Your contact number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Logo (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="file"
                    name="logo"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    {formData.logo ? "Change Logo" : "Upload Logo"}
                  </button>
                </div>
                {formData.logoPreview && (
                  <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200">
                    <img
                      src={formData.logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isGenerating ||
                (!formData.businessName &&
                  !formData.phoneNumber &&
                  !formData.logo)
              }
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Poster"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Poster Generated!
            </h3>
            <p className="text-gray-600 mb-4">
              Your customized poster has been downloaded.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizePosterForm;
