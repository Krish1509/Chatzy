import { FaLinkedin, FaTwitter, FaGithub, FaDiscord, FaWhatsapp } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import chatzyLogo from '../about/TechLogo/ChatzyWithoutBG.png'; // Replace with the actual path to Chatzy logo
import krishPhoto from '../about/TechLogo/krish1.jpeg'; // Replace with the actual path to Krish's photo

const Contact = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        {/* Profile Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={krishPhoto}
            alt="Krish Soni"
            className="w-24 h-24 rounded-full shadow-lg border-2 border-gray-500 hover:scale-110 transition-transform duration-300"
          />
          <h2 className="text-2xl font-bold mt-3">Krish Soni</h2>
          <p className="text-gray-400 mt-2 text-sm">Developer of Chatzy</p>
        </div>

        {/* Contact Me Section (Centered) */}
        <div className="text-center flex flex-col items-center md:w-1/3">
  <h3 className="text-2xl font-bold mb-4">Contact Me</h3>
  <div className="flex flex-wrap justify-center gap-4">
    <a
      href="https://www.linkedin.com/in/krish-soni-4b518a265"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="text-blue-600 hover:scale-110 transition-transform duration-300 text-3xl sm:text-4xl"
    >
      <FaLinkedin />
    </a>
    <a
      href="https://x.com/krishsoni415297"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="text-sky-500 hover:scale-110 transition-transform duration-300 text-3xl sm:text-4xl"
    >
      <FaTwitter />
    </a>
    <a
      href="mailto:krish1509soni@gmail.com"
      aria-label="Email"
      className="text-red-600 hover:scale-110 transition-transform duration-300 text-3xl sm:text-4xl"
    >
      <HiMail />
    </a>
    <a
      href="#"
      aria-label="Discord"
      className="text-indigo-500 hover:scale-110 transition-transform duration-300 text-3xl sm:text-4xl"
    >
      <FaDiscord />
    </a>
    <a
      href="https://wa.me/6352753899"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="text-green-500 hover:scale-110 transition-transform duration-300 text-3xl sm:text-4xl"
    >
      <FaWhatsapp />
    </a>
    <a
      href="https://github.com/Krish1509"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className="text-gray-400 hover:scale-110 transition-transform duration-300 text-3xl sm:text-4xl"
    >
      <FaGithub />
    </a>
  </div>
</div>


        {/* Project Section (Right Aligned) */}
        <div className="text-center md:text-right items-end flex flex-col justify-end">
          <img
            src={chatzyLogo}
            alt="Chatzy Logo"
            className="w-16 h-16 mb-4 hover:rotate-6 transition-transform duration-300 mx-auto md:mx-0"
          />
          <h3 className="text-xl font-semibold underline decoration-gray-500 mb-4">Chatzy Links</h3>
          <div className="space-y-2">
            <a
              href="https://github.com/Krish1509/Chatzy"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-gray-300 transition-colors duration-300 text-sm"
            >
              GitHub Repository
            </a>
            <a
              href="https://chatzyweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-gray-300 transition-colors duration-300 text-sm"
            >
              Chatzy Web
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      <div className="text-center text-sm text-gray-500">
        <p>&copy; 2024 Chatzy by Krish Soni. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Contact;
