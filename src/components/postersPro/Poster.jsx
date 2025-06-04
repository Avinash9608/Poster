import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PreviewCard from "./PreviewCard";
import TemplateSelector from "./TemplateSelector";
import posterTemplates from "./PosterTemplates";

const PosterDesigner = ({ onSave }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(posterTemplates[0]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [footerLeft, setFooterLeft] = useState("");
  const [footerRight, setFooterRight] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [descColor, setDescColor] = useState("");
  const [titleSize, setTitleSize] = useState("");
  const [descSize, setDescSize] = useState("");
  const [textPosition, setTextPosition] = useState({
    left: posterTemplates[0].textPosition?.left || "50%",
    top: posterTemplates[0].textPosition?.top || "50%",
    transform:
      posterTemplates[0].textPosition?.transform || "translate(-50%, -50%)",
    textAlign: posterTemplates[0].textPosition?.textAlign || "center",
    width: posterTemplates[0].textPosition?.width || "90%",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTemplate) {
      setTitle(selectedTemplate.title || "");
      setDescription(selectedTemplate.description || "");
      setFooterLeft(selectedTemplate.footerLeft || "");
      setFooterRight(selectedTemplate.footerRight || "");
      setTitleColor(selectedTemplate.titleColor || "#ffffff");
      setDescColor(selectedTemplate.descColor || "#ffffff");
      setTitleSize(selectedTemplate.titleSize || "72px");
      setDescSize(selectedTemplate.descSize || "36px");
      setTextPosition({
        left: selectedTemplate.textPosition?.left || "50%",
        top: selectedTemplate.textPosition?.top || "50%",
        transform:
          selectedTemplate.textPosition?.transform || "translate(-50%, -50%)",
        textAlign: selectedTemplate.textPosition?.textAlign || "center",
        width: selectedTemplate.textPosition?.width || "90%",
      });
    }
  }, [selectedTemplate]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setBackgroundImage(null);
  };

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePoster = () => {
    const posterData = {
      template: {
        ...selectedTemplate,
        textPosition,
        titleColor,
        descColor,
        titleSize,
        descSize,
      },
      backgroundImage,
      title,
      description,
      footerLeft,
      footerRight,
      createdAt: new Date().toISOString(),
    };
    onSave(posterData);
    navigate("/");
  };

  const handleReset = () => {
    setTitle(selectedTemplate.title || "");
    setDescription(selectedTemplate.description || "");
    setFooterLeft(selectedTemplate.footerLeft || "");
    setFooterRight(selectedTemplate.footerRight || "");
    setTitleColor(selectedTemplate.titleColor || "#ffffff");
    setDescColor(selectedTemplate.descColor || "#ffffff");
    setTitleSize(selectedTemplate.titleSize || "72px");
    setDescSize(selectedTemplate.descSize || "36px");
    setTextPosition({
      left: selectedTemplate.textPosition?.left || "50%",
      top: selectedTemplate.textPosition?.top || "50%",
      transform:
        selectedTemplate.textPosition?.transform || "translate(-50%, -50%)",
      textAlign: selectedTemplate.textPosition?.textAlign || "center",
      width: selectedTemplate.textPosition?.width || "90%",
    });
    setBackgroundImage(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
      <div className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
          aria-label="Back to gallery"
        >
          ← Back to Gallery
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Design Your Poster</h1>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            aria-label="Reset poster"
          >
            Reset
          </button>
          <button
            onClick={handleSavePoster}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            aria-label="Save poster"
          >
            Save Poster
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-6 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Select Template Style
            </h2>
            <TemplateSelector
              templates={posterTemplates}
              selectedTemplate={selectedTemplate}
              onSelect={handleTemplateSelect}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Upload Background
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleBgUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              aria-label="Upload background image"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Customize Text
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Main Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={selectedTemplate.title || "Enter title"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <div className="flex items-center mt-2 gap-4">
                  <div>
                    <label
                      htmlFor="titleColor"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Color
                    </label>
                    <input
                      id="titleColor"
                      type="color"
                      value={titleColor}
                      onChange={(e) => setTitleColor(e.target.value)}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="titleSize"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Size
                    </label>
                    <select
                      id="titleSize"
                      value={titleSize}
                      onChange={(e) => setTitleSize(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      {["48px", "56px", "64px", "72px", "80px"].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subtitle
                </label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    selectedTemplate.description || "Enter description"
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <div className="flex items-center mt-2 gap-4">
                  <div>
                    <label
                      htmlFor="descColor"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Color
                    </label>
                    <input
                      id="descColor"
                      type="color"
                      value={descColor}
                      onChange={(e) => setDescColor(e.target.value)}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="descSize"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      Size
                    </label>
                    <select
                      id="descSize"
                      value={descSize}
                      onChange={(e) => setDescSize(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      {["24px", "28px", "32px", "36px", "40px"].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Footer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="footerLeft"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Left Footer (Website)
                </label>
                <input
                  id="footerLeft"
                  type="text"
                  value={footerLeft}
                  onChange={(e) => setFooterLeft(e.target.value)}
                  placeholder={selectedTemplate.footerLeft || "Enter website"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              <div>
                <label
                  htmlFor="footerRight"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Right Footer (Business)
                </label>
                <input
                  id="footerRight"
                  type="text"
                  value={footerRight}
                  onChange={(e) => setFooterRight(e.target.value)}
                  placeholder={
                    selectedTemplate.footerRight || "Enter business name"
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            Live Preview
          </h2>
          <PreviewCard
            template={{
              ...selectedTemplate,
              textPosition,
              titleColor,
              descColor,
              titleSize,
              descSize,
            }}
            backgroundImage={backgroundImage}
            title={title}
            description={description}
            footerLeft={footerLeft}
            footerRight={footerRight}
            onTextPositionChange={setTextPosition}
          />
        </div>
      </div>
    </div>
  );
};

export default PosterDesigner;
