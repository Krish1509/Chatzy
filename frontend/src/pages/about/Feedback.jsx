import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styles are imported
import { FaCheck } from "react-icons/fa"; // Importing check icon

const Feedback = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Track submission success

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        // process.env.REACT_APP_EMAILJS_SERVICE_ID ,
        // process.env.REACT_APP_EMAILJS_TEMPLATE_ID ,
        "service_8b7518f",
        "template_2862hct",
        form.current,
        // process.env.REACT_APP_EMAILJS_PUBLIC_KEY ,
        "MYNutjC2EHz6Kt3We"
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true); // Set success state
          toast.success("Thank you for your feedback!", {});
          setTimeout(() => setSuccess(false), 4000); // Reset success state after 4 seconds
        },
        (error) => {
          setLoading(false);
          toast.error(`Failed to send feedback: ${error.text}`, {});
        }
      );
  };

  return (
    <div>
      <div
        className="relative feedback-form max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md"
        style={{
          background: "rgba(0, 0, 0, 0.6)", // Slightly dark background
          backdropFilter: "blur(10px)", // Glassmorphism blur effect
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
        }}
      >
        {/* Header */}
        <h2 className="text-2xl font-extrabold text-gray-200 mb-4 text-center">
          ✨ Share Your Feedback ✨
        </h2>
        <p className="text-gray-300 text-center text-sm">
          We value your feedback. Please share your thoughts!
        </p>

        {/* Feedback Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-gray-300 font-medium text-sm mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full p-3 rounded-lg bg-slate-700/80 text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium text-sm mb-1">
              Your Email
            </label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full p-3 rounded-lg bg-slate-700/80 text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium text-sm mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              required
              className="w-full p-3 rounded-lg bg-slate-700/80 text-gray-100 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
              placeholder="Write your message"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            value="send"
            className={`w-full py-3 rounded-lg text-white font-semibold text-base shadow-md transform transition-transform duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : success
                ? "bg-green-500"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            }`}
            disabled={loading || success}
          >
            {success ? (
              <div className="flex items-center justify-center">
                <FaCheck className="text-white mr-2" /> Thank You!
              </div>
            ) : loading ? (
              "Sending..."
            ) : (
              "Send Feedback"
            )}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Feedback;
