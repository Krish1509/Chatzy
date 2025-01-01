import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { FaCamera } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const ProfileLoader = () => {
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const [previewPic, setPreviewPic] = useState(authUser?.profilePic || "defaultProfilePic.png");
  const [newPic, setNewPic] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [profileCreating] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isConfetti, setIsConfetti] = useState(false);
  const navigate = useNavigate();

  const isOnline = authUser && onlineUsers.includes(authUser._id);

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(welcomeTimeout);
  }, []);

  useEffect(() => {
    if (profileCreating) {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress < 50) {
          progress += 5;
        } else if (progress < 100) {
          progress += 1;
        } else {
          progress = 100;
          clearInterval(interval);
          setIsConfetti(true);
        }
        setLoadingProgress(progress);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [profileCreating]);

  const handleUploadImage = () => {
    if (newPic) {
      setPreviewPic(URL.createObjectURL(newPic));
      toast.success("🎉 Profile picture uploaded successfully!", {
        position: "top-center",
        duration: 3000,
      });
      setNewPic(null);
    } else {
      toast.error("⚠️ Please select a picture to upload!", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  const handleCancelUpload = () => {
    setNewPic(null);
    toast.error("❌ Profile picture upload canceled.", {
      position: "top-center",
      duration: 3000,
    });
  };

  const handleGetStarted = () => {
    navigate("/");
    setIsConfetti(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 backdrop-blur-lg bg-opacity-30 text-white">
      <Toaster />
      {showWelcome ? (
        <div className="welcome-box text-center bg-transparent p-6">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl animate-typing border-r-2 border-white overflow-hidden whitespace-nowrap w-[30ch] mb-4 text-white">
            🎉 Welcome to Chatzy, {authUser?.fullName || "User"} 🎉
          </h1>
        </div>
      ) : (
        <>
          {isConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200}
              gravity={0.2}
              recycle={false}
            />
          )}
          <div className="flex flex-col items-center space-y-8 space-x-4 w-full max-w-3xl p-4 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl ">
            <div className="flex flex-col items-center w-full mb-4 mx-">
              <div className="w-full text-center my-2">
                <h2 className="text-3xl font-bold text-gray-200 mb-2">✨ Welcome, {authUser?.fullName || "User"} ✨</h2>
              </div>
              <div className="relative w-28 h-28 md:w-36 md:h-36 mb-6">
                <div
                  className={`absolute inset-0 rounded-full ${
                    isOnline ? "border-4 border-green-500" : "border-4 border-gray-600"
                  }`}
                >
                  <img
                    src={previewPic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full z-10"
                  />
                </div>
                <label
                  htmlFor="profile-image-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer z-30 hover:bg-blue-500 transition"
                >
                  <FaCamera className="text-white text-lg" />
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setNewPic(e.target.files[0])}
                />
              </div>

              {newPic && (
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={handleUploadImage}
                    className="px-6 py-3 bg-blue-500 text-lg font-bold rounded-lg shadow-md hover:bg-blue-400 transition"
                  >
                    📤 Upload
                  </button>
                  <button
                    onClick={handleCancelUpload}
                    className="px-6 py-3 bg-red-500 text-lg font-bold rounded-lg shadow-md hover:bg-red-400 transition"
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
              {/* Profile details section */}
              <div className="w-full text-center mt-">
                <p className="text-lg text-gray-400 mb-1">
                  Username: <span className="text-blue-400">@{authUser?.username || "username"}</span>
                </p>
                <p className="text-lg text-gray-400 mb-1">
                  FullName: <span className="text-blue-400">{authUser?.fullName || "fullName"}</span>
                </p>
                <p className="text-lg text-gray-400">
                  Gender: <span className="text-blue-400">{authUser?.gender || "Not Specified"}</span>
                </p>
              </div>

              <div className="w-full text-center mt-4">
                <p className="text-md font-medium text-gray-300 mb-2">
                  {loadingProgress < 100 ? "⏳ Creating your profile..." : "🎉 Profile Created!"}
                </p>
                <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
              </div>
              {loadingProgress === 100 && (
                <div className="flex flex-col items-center space-y-2 mt-6 ">
                  <button
                    onClick={handleGetStarted}
                    className="px-6 py-3 bg-green-500 text-lg font-bold rounded-lg shadow-md hover:bg-green-400 transition focus:ring-4 focus:ring-green-300"
                  >
                    🎉 Get Started 🚀
                  </button>
                </div>
              )}
            </div>
          </div>
          <span className="mb-[-10px] mt-[10px] text-center  items-center ">© {new Date().getFullYear()} Chatzy by Krish Soni. All Rights Reserved.</span>

        </>
      )}
    </div>
  );
};

export default ProfileLoader;
