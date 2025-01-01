import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import About from "./pages/about/about";
import ChatBot from './components/AI_ChatBot/AI_ChatBot_FullSize';
import { useState, useEffect } from 'react';
import Loader from './components/Loder/Loader'; // Ensure the correct path to your Loader component
import CustomCursor from "./custom/CustomCursor"
import ProfileLoder from "./pages/signup/ProfileLoder"
function App() {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulating an API call or delay to demonstrate the loader
    const timer = setTimeout(() => {
      setLoading(false); // After 3 seconds, set loading to false (adjust as needed)
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // If the app is still loading, display the Loader component
  if (loading) {
    return <Loader />;
  }

  // Once loading is complete, display the application content
  return (
    <div className='h-screen flex flex-col justify-center'>
            <CustomCursor />

      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <ProfileLoder/> : <SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/ChatBot' element={<ChatBot />} />
        
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
