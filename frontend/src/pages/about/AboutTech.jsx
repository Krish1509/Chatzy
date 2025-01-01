import react from "./TechLogo/react.png";
import node from "./TechLogo/node.png";
import ex from "./TechLogo/ex.png";
import mongodb from "./TechLogo/mongodb.png";
import jwt from "./TechLogo/jwt.png";
import bcrypt from "./TechLogo/bcrypt.jpg";
import zustand from "./TechLogo/zustand.jpg";
import gemini from "./TechLogo/Gemini.png";
import daisy from "./TechLogo/daisy.png";
import motions from "./TechLogo/motion.jpg";
import socket from "./TechLogo/socket.png";
import tailwind from "./TechLogo/tailwind.png";
import three from "./TechLogo/three.png";
import cloudinary from "./TechLogo/cloudinary.png";
import EmailJS from "./TechLogo/EmailJS.png";
import render from "./TechLogo/render.png";

const AboutTech = () => {
  
  
  const technologies = [
    { name: "React", logo: react, url: "https://reactjs.org", category: "Frontend", important: true },
    { name: "Socket.io", logo: socket, url: "https://socket.io", category: "Backend", important: true },
    { name: "Node.js", logo: node, url: "https://nodejs.org", category: "Backend", important: true },
    { name: "Express.js", logo: ex, url: "https://expressjs.com", category: "Backend", important: true },
    { name: "Mongoose", logo: mongodb, url: "https://mongoosejs.com", category: "Backend" , important: true },    
    { name: "Tailwind CSS", logo: tailwind, url: "https://tailwindcss.com", category: "Frontend", important: true },
    { name: "DaisyUI", logo: daisy, url: "https://daisyui.com", category: "Frontend" , important: true},
    { name: "JWT", logo: jwt, url: "https://jwt.io", category: "Backend" , important: true },
    { name: "Zustand", logo: zustand, url: "https://zustand-demo.pmnd.rs", category: "Tools", important: true },
    { name: "BcryptJS", logo: bcrypt, url: "https://www.npmjs.com/package/bcrypt", category: "Backend", important: true },
    { name: "EmailJS", logo: EmailJS, url: "https://www.emailjs.com/", category: "Backend", important: true },
    { name: "Framer Motion", logo: motions, url: "https://www.framer.com/motion/", category: "Frontend", important: true },
    { name: "Cloudinary", logo: cloudinary, url: "https://cloudinary.com", category: "Tools", important: true },
    { name: "Three.js", logo: three, url: "https://threejs.org", category: "Frontend", important: true },
    { name: "Gemini", logo: gemini, url: "https://www.gemini.com", category: "Backend" , important: true},
    { name: "Render", logo: render, url: "https://www.onrender,com", category: "Hosting" , important: true},

  ];

  return ( <div>
     <div className="flex-1 bg-gradient-to-br mt-10  text-white py-10 px-5 overflow-hidden">
    {/* Page Heading */}
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold">Technologies Used</h2>
      <p className="text-gray-400 mt-2">
        Explore the tools and technologies . Click on any technology to learn more!
      </p>
    </div>

    {/* Technology Cards */}
    <div className="relative w-full">
      <div className="scrolling-container flex space-x-8">
        {technologies
          .sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0))
          .map((tech, index) => (
            <div
              key={index}
              onClick={() => window.open(tech.url, "_blank")}
              className={`cursor-pointer p-6 flex-shrink-0 w-60 rounded-lg shadow-lg bg-gray-800 transform transition-all hover:scale-110 hover:bg-gray-700 ${
                tech.important ? "border-4 border-blue-500" : "border-2 border-gray-700"
              }`}
            >
              <img
                src={tech.logo}
                alt={`${tech.name} Logo`}
                className="w-16 h-16 mb-4 mx-auto"
              />
              <h4 className="text-xl font-bold text-center text-blue-300">
                {tech.name}
              </h4>
              <p className="text-xs text-center text-gray-400 mt-2">
                {tech.category}
              </p>
            </div>
          ))}
      </div>
    </div>
  </div>

  <style>
{`
.scrolling-container {
  display: flex;
  animation: scroll-left 19s linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-300%);
  }
}

/* For medium screens */
@media (max-width: 1024px) {
  @keyframes scroll-left {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-500%);
    }
  }
}

/* For small screens */
@media (max-width: 768px) {
  @keyframes scroll-left {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-1600%);
    }
  }
}

/* For large screens */
@media (min-width: 1280px) {
  @keyframes scroll-left {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-300%);
    }
  }
}
`}
</style>

  
  </div>
  );
};

export default AboutTech;