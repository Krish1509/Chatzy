import Navbar from "../../components/NavigatSidebar/NavSidebar";
import FeedBack from "./Feedback";
import bg3 from "./TechLogo/bg3.gif";
import AboutTech from "./AboutTech";
import Contact from "../Contact/Contact";

const About = () => {

  return (
    <div
      className="flex flex- md:flex-row h-screen bg-gray-800 bg-opacity-50 bg-cover bg-center bg-no-repeat backdrop-blur-3xl"
      style={{
        backgroundImage: `url(${bg3})`,
      }}
    >
      {/* Sidebar Navigation */}
      <div className="w-16">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12 px-4 text-white overflow-auto backdrop-blur-md">
        {/* Welcome Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-400 mb-4 animate-fade-in">
            Welcome to Chatzy
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-slide-in">
            <span className="text-3xl text-blue-500 font-bold">“</span>
            Chatzy is a secure, real-time chat application built using
            cutting-edge technologies like React, Socket.io, Node.js, Express,
            and MongoDB. Experience seamless communication.
            <span className="text-3xl text-blue-500 font-bold">”</span>
          </p>
        </div>

        {/* Features and User Experience Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Features Card */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-300 mb-6">
              Features
            </h2>
            <ul className="text-gray-400 space-y-4">
              <li>🚀 Real-time messaging for instant communication</li>
              <li>🔒 Secure authentication using JWT and bcrypt</li>
              <li>🤖 AI-powered Chatbot (ChatzyBot)</li>
              <li>🖼️ Customizable profile pictures</li>
              <li>🎨 Fully customizable backgrounds</li>
              <li>📱 Responsive UI for all devices</li>
              <li>🔔 Real-time notifications</li>
              <li>📂 Robust error handling</li>
            </ul>
          </div>

          {/* User Experience Card */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-300 mb-6">
              User Experience
            </h2>
            <ul className="text-gray-400 space-y-4">
              <li>👤 Unique Signup/Login process</li>
              <li>🎉 Elegant profile loading animations</li>
              <li>📜 Contextual toast notifications</li>
              <li>📋 Intuitive conversation sidebar</li>
              <li>💬 Streamlined message container</li>
              <li>✨ Beautiful loader animations</li>
              <li>⚙️ User-friendly customization settings</li>
              <li>🔄 Smooth navigation and transitions</li>
            </ul>
          </div>
        </div>

        {/* About Tech Section */}
        <AboutTech />

       
        {/* Feedback Section */}
        <div className="mt-20">
          <FeedBack />
        </div>

        {/* Contact Section */}
        <div className="mt-12 mb-[-40px]">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default About;
