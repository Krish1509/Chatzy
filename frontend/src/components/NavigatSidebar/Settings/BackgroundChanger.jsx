import { useState } from "react";

const solidColors = [
  "#1B1B2F", "#16213E", "#415A77", "#D4A5FF"
];

const gradientColors = [
  "linear-gradient(135deg, #0D1B2A, #1B263B)",
  "linear-gradient(135deg, #415A77, #E0E1DD)",
  "linear-gradient(135deg, #1B263B, #F4A261)",
  "linear-gradient(135deg, #0D1B2A, #415A77)",
  "linear-gradient(135deg, #F4A261, #E0E1DD)",
  "linear-gradient(135deg, #1B1B2F, #6A0572)",
  "linear-gradient(135deg, #16213E, #D4A5FF)",
  "linear-gradient(135deg, #4E4E50, #1B1B2F)",
  "linear-gradient(135deg, #6A0572, #D4A5FF)",
  "linear-gradient(135deg, #1B1B2F, #4E4E50)"
];

const images = [
  "/assets/Backgrounds/bg.png", "/assets/Backgrounds/bg1.png", "/assets/Backgrounds/bg2.png", "/assets/Backgrounds/bg3.jpeg", "/assets/Backgrounds/bg4.jpg",
  "/assets/Backgrounds/bg5.jfif", "/assets/Backgrounds/bg6.png", "/assets/Backgrounds/bg7.jpg", "/assets/Backgrounds/bg8.jpg", "/assets/Backgrounds/bg9.jpg",
];

const gifs = [
  "/assets/Backgrounds/bg1.gif", "/assets/Backgrounds/bg2.gif", "/assets/Backgrounds/bg3.gif", "/assets/Backgrounds/bg4.gif", "/assets/Backgrounds/bg5.gif",
  "/assets/Backgrounds/bg6.gif", "/assets/Backgrounds/bg7.gif", "/assets/Backgrounds/bg8.gif", "/assets/Backgrounds/bg9.gif", "/assets/Backgrounds/bg10.gif"
];

function BackgroundChanger() {
  const [selectedBg, setSelectedBg] = useState("/assets/Backgrounds/bg1.gif");
  const [customColor, setCustomColor] = useState("#FFFFFF");

  const handleBgChange = (bg, isColor = false) => {
    setSelectedBg(bg);
    if (isColor) {
      document.body.style.background = bg;
      document.body.style.backgroundSize = "cover";
    } else {
      document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bg})`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-1">
      {/* Solid Colors */}
      <div className="w-full">
        <h4 className="text-center mb-2 text-lg font-bold text-gray-200">Solid Colors</h4>
        <div className="grid grid-cols-5 gap-2">
          {solidColors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleBgChange(color, true)}
              style={{
                background: color,
                width: "30px",
                height: "30px",
                borderRadius: "6px",
                border: selectedBg === color ? "2px solid #fff" : "none",
                boxShadow: selectedBg === color ? "0 0 8px #fff" : "0 0 4px rgba(0,0,0,0.5)",
                cursor: "pointer",
              }}
            ></button>
          ))}
          {/* Custom Color Picker for 4th and 5th Button */}
          
          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              handleBgChange(e.target.value, true);
            }}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "6px",
              cursor: "pointer",
              border: "none",
            }}
          />
        </div>
      </div>

      <hr className="w-full border-t border-gray-500" />

      {/* Gradient Colors */}
      <div className="w-full">
        <h4 className="text-center mb-2 text-lg font-bold text-gray-200">Gradient Colors</h4>
        <div className="grid grid-cols-5 gap-2">
          {gradientColors.map((gradient, index) => (
            <button
              key={index}
              onClick={() => handleBgChange(gradient, true)}
              style={{
                background: gradient,
                width: "30px",
                height: "30px",
                borderRadius: "6px",
                border: selectedBg === gradient ? "2px solid #fff" : "none",
                boxShadow: selectedBg === gradient ? "0 0 8px rgba(255,255,255,0.8)" : "0 0 4px rgba(0,0,0,0.5)",
                cursor: "pointer",
              }}
            ></button>
          ))}
        </div>
      </div>

      <hr className="w-full border-t border-gray-500" />

      {/* Images */}
      <div className="w-full">
        <h4 className="text-center mb-2 text-lg font-bold text-gray-200">Images</h4>
        <div className="grid grid-cols-5 gap-2">
          {images.map((bg, index) => (
            <button
              key={index}
              onClick={() => handleBgChange(bg)}
              style={{
                backgroundImage: `url(${bg})`,
                width: "30px",
                height: "30px",
                backgroundSize: "cover",
                borderRadius: "6px",
                border: selectedBg === bg ? "2px solid #fff" : "none",
                boxShadow: selectedBg === bg ? "0 0 8px #fff" : "0 0 4px rgba(0,0,0,0.5)",
                cursor: "pointer",
              }}
            ></button>
          ))}
        </div>
      </div>

      <hr className="w-full border-t border-gray-500" />

      {/* GIFs */}
      <div className="w-full">
        <h4 className="text-center mb-2 text-lg font-bold text-gray-200">GIFs</h4>
        <div className="grid grid-cols-5 gap-2">
          {gifs.map((bg, index) => (
            <button
              key={index}
              onClick={() => handleBgChange(bg)}
              style={{
                backgroundImage: `url(${bg})`,
                width: "30px",
                height: "30px",
                backgroundSize: "cover",
                borderRadius: "6px",
                border: selectedBg === bg ? "2px solid #fff" : "none",
                boxShadow: selectedBg === bg ? "0 0 8px #fff" : "0 0 4px rgba(0,0,0,0.5)",
                cursor: "pointer",
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BackgroundChanger;
