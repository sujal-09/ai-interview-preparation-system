import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data
            );

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            toast.error("Invali Credentials");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-800">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-cyan-400 mb-3">
                        AI Interview Prep
                    </h1>

                    <p className="text-slate-400">
                        Practice smarter with AI-powered interviews
                    </p>

                </div>

                <div className="space-y-5">

                    <div>

                        <label className="block text-sm mb-2 text-slate-300">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                        />

                    </div>

                    <div>

                        <label className="block text-sm mb-2 text-slate-300">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                        />

                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-3 rounded-xl font-bold text-lg"
                    >
                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }
                    </button>

                </div>

                <div className="mt-8 text-center">

                    <p className="text-slate-400">
                        Don’t have an account?
                    </p>

                    <Link
                        to="/register"
                        className="text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                        Create Account
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;