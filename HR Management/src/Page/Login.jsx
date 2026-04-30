import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import signupImage from '../assets/vivahr.jpeg';


export default function Signup({ onLogin }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isSignUp, setSignUp] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!isSignUp && !acceptedTerms) {
                setError('Please accept the Terms and Conditions and Privacy Policy before signing up');
                setLoading(false);
                return;
            }
            if (!isSignUp && form.password !== form.confirmPassword) {
                setError('Passwords do not match');
                setLoading(false);
                return;
            }

            if (isSignUp) {
                // Sign In
                const response = await axios.post("http://localhost:5000/signin", {
                    email: form.email,
                    password: form.password
                });

                if (response.data.message === "Login Success") {
                    onLogin();
                    navigate('/SidePanle');
                    alert("Login Successful");
                }
            } else {
                // Sign Up
                await axios.post("http://localhost:5000/signup", form);
                // Auto sign in after signup
                const response = await axios.post("http://localhost:5000/signin", {
                    email: form.email,
                    password: form.password
                });

                if (response.data.message === "Login Success") {
                    onLogin();
                    navigate('/SidePanle');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen">
            {/* Left - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-10 py-16">
                <div className="w-full max-w-sm">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1"> {isSignUp ? "Sign In" : " Sign Up"}</h2>
                    <p className="text-sm text-gray-500 mb-6"> {isSignUp ? 'Enter your email and password to sign In' : " Enter your email and password to sign Up"} !</p>

                    <form onSubmit={handleSubmit} className="space-y-4 py-10">
                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
                                {error}
                            </div>
                        )}

                        {/* First & Last Name */}

                        {!isSignUp && (
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Frist Name
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter your first name"

                                        onChange={handle}
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-500 placeholder:text-gray-400"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter your last name"

                                        onChange={handle}
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-500 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        )}



                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"

                                onChange={handle}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-500 placeholder:text-gray-400"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password" placeholder="Enter your password"

                                    onChange={handle}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-500 placeholder:text-gray-400 pr-10"
                                />
                                <button type="button"
                                    onClick={() => setShowPassword(!showPassword)}

                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">

                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        {!isSignUp && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm your password"
                                        value={form.confirmPassword} onChange={handle}
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-500 placeholder:text-gray-400 pr-10"
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">

                                    </button>
                                </div>
                            </div>

                        )}

                        {!isSignUp && (
                            <div className="flex items-start gap-3">
                                <label className="flex items-start gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        className="h-5 w-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-600">
                                        By creating an account means you agree to the{' '}
                                        <button type="button" onClick={() => setLegalModal('terms')} className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer text-sm">Terms and Conditions</button>
                                        , and our{' '}
                                        <button type="button" onClick={() => setLegalModal('privacy')} className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer text-sm">Privacy Policy</button>
                                    </span>
                                </label>
                            </div>
                        )}

                        {/* froget password */}
                        <div className="flex items-center justify-between">
                            <div className=" flex items-center gap-2"> </div>
                            <a className='text-sm font-semibold text-blue-500 cursor-pointer hover:border-b-blue-400' href="#"> {isSignUp ? " Forget Password " : ""}</a>
                        </div>


                        <button type="submit"
                            disabled={loading || (!isSignUp && !acceptedTerms)}
                            className={`w-full font-semibold py-2.5 rounded transition-all duration-700 ease-in-out cursor-pointer ${loading ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-500'} text-white`}>

                            {loading ? "Please wait..." : (isSignUp ? "Sign In" : " Sign Up")}
                        </button>
                    </form>

                    <div className="mt-5">
                        {isSignUp ? "  Don't have an account?" : " Already have an account? "}
                        <span onClick={() => setSignUp(!isSignUp)} className='text-blue-600 cursor-pointer'>

                            {isSignUp ? " Sign Up" : " Sign In "}     </span> </div>
                </div>
            </div>

            {/* Right - Image */}
            <div className="hidden lg:flex w-1/2 items-center justify-center" style={{ backgroundColor: '#0f1f4b' }}>
                <img src={signupImage} alt=" " className="w-full h-full object-cover" />
            </div>


        </div>
    );
}