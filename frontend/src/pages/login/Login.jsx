import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin'; // Ensure this hook is correctly implemented

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className='flex backdrop-blur-[10px] flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
            <div className="p-6 shadow-md backdrop:filter backdrop-blue-lg w-full max-w-md bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-100'>Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Username'
                            className='w-full h-10 input input-bordered focus:outline-none focus:border-blue-500 bg-[#1D232A] text-gray-300'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className='text-base label-text text-gray-100'>Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            className="w-full h-10 input input-bordered focus:outline-none focus:border-blue-500 bg-[#1D232A] text-gray-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-200">
                        {"Don't "} have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 text-gray-200 hover:border-blue-600 bg-blue-600 border-[#1D232A]' disabled={loading} type="submit">
                            {loading ? 'Login....' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
            <p className="mb-[-90px] mt-[90px] flex justify-center items-center text-center">© {new Date().getFullYear()} Chatzy by Krish Soni. All Rights Reserved.</p>

        </div>
    );
};

export default Login;
