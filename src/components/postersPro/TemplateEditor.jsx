import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateEditor = ({ onSave }) => {
  const [templateName, setTemplateName] = useState('My Custom Template');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [borderColor, setBorderColor] = useState('#eaeaea');
  const [logoColor, setLogoColor] = useState('#4a6cf7');
  const [logoText, setLogoText] = useState('Logo');
  const [imageColor, setImageColor] = useState('#f5f7ff');
  const [titleColor, setTitleColor] = useState('#1d2130');
  const [descColor, setDescColor] = useState('#525560');
  const [footerColor, setFooterColor] = useState('#666666');
  const navigate = useNavigate();

  const handleSave = () => {
    const newTemplate = {
      id: Date.now(),
      name: templateName,
      backgroundColor,
      borderColor,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      logoPosition: { top: "20px", left: "20px" },
      logoColor,
      logoText,
      imagePosition: { 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)",
        width: "150px",
        height: "150px"
      },
      imageColor,
      imageBorder: "1px solid #f0f0f0",
      textPosition: { 
        top: "30px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        textAlign: "center",
        width: "80%"
      },
      titleColor,
      titleFont: "'Montserrat', sans-serif",
      titleSize: "32px",
      descColor,
      descFont: "'Open Sans', sans-serif",
      descSize: "18px",
      footerPosition: { bottom: "30px", left: "50%", transform: "translateX(-50%)", textAlign: "center" },
      footerColor,
      footerFont: "'Arial', sans-serif",
      footerSize: "14px",
      footerLeft: "www.yourbusiness.com",
      footerRight: "© 2023 Your Business",
      qrPlaceholder: true
    };
    
    onSave(newTemplate);
    navigate('/');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
      <div className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
          aria-label="Back to gallery"
        >
          ← Back to Gallery
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Create New Template</h1>
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          aria-label="Save template"
        >
          Save Template
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-6 bg-white border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="mb-6">
            <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
            <input
              id="templateName"
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="backgroundColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-sm text-gray-600">{backgroundColor}</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="borderColor" className="block text-sm font-medium text-gray-700 mb-1">Border Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="borderColor"
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-sm text-gray-600">{borderColor}</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="logoColor" className="block text-sm font-medium text-gray-700 mb-1">Logo Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="logoColor"
                  type="color"
                  value={logoColor}
                  onChange={(e) => setLogoColor(e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-sm text-gray-600">{logoColor}</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="logoText" className="block text-sm font-medium text-gray-700 mb-1">Logo Text</label>
              <input
                id="logoText"
                type="text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            
            <div>
              <label htmlFor="imageColor" className="block text-sm font-medium text-gray-700 mb-1">QR Placeholder Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="imageColor"
                  type="color"
                  value={imageColor}
                  onChange={(e) => setImageColor(e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-sm text-gray-600">{imageColor}</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="titleColor" className="block text-sm font-medium text-gray-700 mb-1">Title Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="titleColor"
                  type="color"
                  value={titleColor}
                  onChange={(e) => setTitleColor(e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-sm text-gray-600">{titleColor}</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="descColor" className="block text-sm font-medium text-gray-700 mb-1">Description Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="descColor"
                  type="color"
                  value={descColor}
                  onChange={(e) => setDescColor(e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-sm text-gray-600">{descColor}</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="footerColor" className="block text-sm font-medium text-gray-700 mb-1">Footer Text Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="footerColor"
                  type="color"
                  value={footerColor}
                  onChange={(e) => setFooterColor(e.target.value)}
                  className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-sm text-gray-600">{footerColor}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 p-6 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Template Preview</h2>
          <div 
            className="w-full h-96 rounded-2xl relative overflow-hidden shadow-md"
            style={{ backgroundColor }}
          >
            <div 
              className="absolute top-5 left-5 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
              style={{ backgroundColor: logoColor }}
            >
              {logoText}
            </div>
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-xl flex flex-col items-center justify-center"
              style={{ backgroundColor: imageColor }}
            >
              <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-1">
                <span className="text-black font-bold text-xs">QR CODE</span>
              </div>
              <p className="text-white text-sm font-medium">SCAN HERE</p>
            </div>
            <div 
              className="absolute top-10 left-1/2 transform -translate-x-1/2 w-4/5 text-center"
            >
              <div 
                className="h-8 rounded mb-3 mx-auto"
                style={{ backgroundColor: titleColor, width: '60%' }}
              ></div>
              <div 
                className="h-4 rounded mx-auto"
                style={{ backgroundColor: descColor, width: '80%' }}
              ></div>
            </div>
            <div 
              className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-4/5 text-center"
            >
              <div 
                className="h-3 rounded mx-auto"
                style={{ backgroundColor: footerColor, width: '90%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;