import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";


function ResumeAnalyzer() {

    const [file, setFile] = useState(null);

    const [result, setResult] = useState("");

    const [loading, setLoading] = useState(false);

    const analyzeResume = async () => {

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");

            const formData = new FormData();

            formData.append("file", file);

            const response = await axios.post(
                "http://localhost:8080/api/resume/analyze",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            setResult(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Resume Analysis Failed");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="flex bg-slate-950 text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10 overflow-auto">

                <div className="max-w-5xl mx-auto">

                    <h1 className="text-5xl font-bold mb-3">

                        AI Resume Analyzer

                    </h1>

                    <p className="text-slate-400 text-lg mb-10">

                        Upload your resume and get ATS analysis,
                        skill suggestions, and AI feedback.

                    </p>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-xl">

                        <div className="flex flex-col md:flex-row items-center gap-6">

                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) =>
                                    setFile(
                                        e.target.files[0]
                                    )
                                }
                                className="bg-slate-800 p-4 rounded-xl w-full"
                            />

                            <button
                                onClick={analyzeResume}
                                className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-bold text-lg whitespace-nowrap"
                            >
                                Analyze Resume
                            </button>

                        </div>

                    </div>

                    {
                        loading && (

                            <div className="mt-8 bg-slate-900 p-6 rounded-2xl">

                                <h2 className="text-xl font-semibold">

                                    Analyzing Resume...

                                </h2>

                            </div>
                        )
                    }

                    {
                        result && (

                            <div className="mt-8 bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-xl whitespace-pre-wrap leading-8">

                                {result}

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default ResumeAnalyzer;