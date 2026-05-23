import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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

    const handleRegister = async () => {

        try {

            setLoading(true);

            await axios.post(
                "http://localhost:8080/api/auth/register",
                formData
            );

            toast.success("Registration Successful");

            navigate("/");

        } catch (error) {

            console.log(error);

            toast.error("Registration Failed");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-800">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-cyan-400 mb-3">
                        Create Account
                    </h1>

                    <p className="text-slate-400">
                        Start your AI interview preparation journey
                    </p>

                </div>

                <div className="space-y-5">

                    <div>

                        <label className="block text-sm mb-2 text-slate-300">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                        />

                    </div>

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
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                        />

                    </div>

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-3 rounded-xl font-bold text-lg"
                    >
                        {
                            loading
                                ? "Creating Account..."
                                : "Register"
                        }
                    </button>

                </div>

                <div className="mt-8 text-center">

                    <p className="text-slate-400">
                        Already have an account?
                    </p>

                    <Link
                        to="/"
                        className="text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                        Login Here
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Register;