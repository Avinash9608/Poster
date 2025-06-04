import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

const PreviewCard = ({ 
  template, 
  backgroundImage,
  title, 
  description,
  footerLeft,
  footerRight,
  style,
  onTextPositionChange
}) => {
  const posterRef = useRef(null);
  const textRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    left: template.textPosition?.left || '50%',
    top: template.textPosition?.top || '50%',
    transform: template.textPosition?.transform || 'translate(-50%, -50%)',
    textAlign: template.textPosition?.textAlign || 'center',
    width: template.textPosition?.width || '90%'
  });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const limit = { x: 15, y: 3 };

  const handleDownload = () => {
    html2canvas(posterRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'poster.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    
    const rect = posterRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();
    
    const currentX = textRect.left - rect.left;
    const currentY = textRect.top - rect.top;
    
    setStartPos({
      x: e.clientX - currentX,
      y: e.clientY - currentY
    });
    
    setIsDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

 const handleMouseMove = (e) => {
  if (!isDragging) return;

  const rect = posterRef.current.getBoundingClientRect();
  const textRect = textRef.current.getBoundingClientRect();

  let newX = e.clientX - startPos.x;
  let newY = e.clientY - startPos.y;

  newX = Math.max(0, Math.min(newX, rect.width - textRect.width));
  newY = Math.max(0, Math.min(newY, rect.height - textRect.height));

  const newPosition = {
    left: `${newX}px`,
    top: `${newY}px`,
    transform: 'none',
    textAlign: position.textAlign,
    width: position.width
  };

  setPosition(newPosition);
  if (onTextPositionChange) {
    onTextPositionChange(newPosition);
  }
};


  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startPos]);

  useEffect(() => {
    setPosition({
      left: template.textPosition?.left || '50%',
      top: template.textPosition?.top || '50%',
      transform: template.textPosition?.transform || 'translate(-50%, -50%)',
      textAlign: template.textPosition?.textAlign || 'center',
      width: template.textPosition?.width || '90%'
    });
  }, [template]);

  useEffect(() => {
    if (template.type === 'parallax' && posterRef.current) {
      const handleParallaxMove = (e) => {
        const rect = posterRef.current.getBoundingClientRect();
        const mouse = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        const clamped = {
          x: (mouse.x / rect.width * limit.x - (limit.x / 2)),
          y: (mouse.y / rect.height * limit.y - (limit.y / 2))
        };

        const layers = posterRef.current.querySelectorAll('.parallax-layer');
        layers.forEach((layer, i) => {
          const depth = template.layers[i].depth || 0;
          layer.style.transform = `translateX(${clamped.x * depth * -1}px) translateY(${clamped.y * depth * -1}px)`;
        });
      };

      posterRef.current.addEventListener('mousemove', handleParallaxMove);
      return () => {
        if (posterRef.current) {
          posterRef.current.removeEventListener('mousemove', handleParallaxMove);
        }
      };
    }
  }, [template]);

  if (template.type === 'parallax') {
    return (
      <div className="flex flex-col items-center">
        <div 
          ref={posterRef}
          className="w-full max-w-md h-[700px] rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-xl"
          style={{ 
            backgroundColor: template.backgroundColor,
            ...style
          }}
        >
          <div className="parallax-container">
            {template.layers.map((layer, index) => (
              <div 
                key={index}
                className="parallax-layer absolute inset-0"
                style={{ 
                  backgroundImage: `url(${layer.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: template.layers.length - index
                }}
              ></div>
            ))}
          </div>

          <div 
            ref={textRef}
            className="absolute z-10 cursor-move select-none"
            style={{
              ...position,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
          >
            <h2 
              className="poster-title font-bold"
              style={{ 
                color: template.titleColor,
                fontFamily: template.titleFont,
                fontSize: template.titleSize,
                textTransform: template.titleStyle
              }}
            >
              {title || template.title}
            </h2>
            <p 
              className="poster-description"
              style={{ 
                color: template.descColor,
                fontFamily: template.descFont,
                fontSize: template.descSize,
                textTransform: template.descStyle
              }}
            >
              {description || template.description}
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
            <span 
              className="text-sm"
              style={{
                color: template.footerColor,
                fontSize: template.footerSize
              }}
            >
              {footerLeft || template.footerLeft}
            </span>
            <span 
              className="text-sm"
              style={{
                color: template.footerColor,
                fontSize: template.footerSize
              }}
            >
              {footerRight || template.footerRight}
            </span>
          </div>
        </div>
        <button 
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          aria-label="Download poster"
        >
          Download Poster
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={posterRef}
        className="w-full max-w-md h-[700px] rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-xl"
        style={{ 
          backgroundColor: template.backgroundColor,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 
                        template.previewImage ? `url(${template.previewImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...style
        }}
      >
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: template.overlayColor || 'rgba(0,0,0,0.4)'
          }}
        ></div>

        <div 
          ref={textRef}
          className="absolute z-10 cursor-move select-none"
          style={{
            ...position,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
        >
          <h2 
            className="poster-title font-bold"
            style={{ 
              color: template.titleColor,
              fontFamily: template.titleFont,
              fontSize: template.titleSize,
              textTransform: template.titleStyle
            }}
          >
            {title || template.title}
          </h2>
          <p 
            className="poster-description"
            style={{ 
              color: template.descColor,
              fontFamily: template.descFont,
              fontSize: template.descSize,
              textTransform: template.descStyle
            }}
          >
            {description || template.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <span 
            className="text-sm"
            style={{
              color: template.footerColor,
              fontSize: template.footerSize
            }}
          >
            {footerLeft || template.footerLeft}
          </span>
          <span 
            className="text-sm"
            style={{
              color: template.footerColor,
              fontSize: template.footerSize
            }}
          >
            {footerRight || template.footerRight}
          </span>
        </div>
      </div>

      <button 
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Download poster"
      >
        Download Poster
      </button>
    </div>
  );
};

export default PreviewCard;