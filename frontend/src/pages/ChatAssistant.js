import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function ChatAssistant() {

    const [message, setMessage] = useState("");

    const [response, setResponse] = useState("");

    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:8080/api/interview/chat",
                {
                    message
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setResponse(res.data);

        } catch (error) {

            console.log(error);

            toast.error("AI request failed");

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

                        AI Chat Assistant

                    </h1>

                    <p className="text-slate-400 text-lg mb-10">

                        Ask coding, interview, DSA,
                        or resume-related questions.

                    </p>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

                        <textarea
                            placeholder="Ask anything..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            rows="6"
                            className="w-full bg-slate-800 rounded-2xl p-5 text-white outline-none border border-slate-700"
                        />

                        <button
                            onClick={askAI}
                            className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-bold text-lg"
                        >
                            Ask AI
                        </button>

                    </div>

                    {
                        loading && (

                            <div className="mt-8 bg-slate-900 p-6 rounded-2xl">

                                AI is thinking...

                            </div>
                        )
                    }

                    {
                        response && (

                            <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-10 whitespace-pre-wrap leading-8 shadow-xl">

                                {response}

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default ChatAssistant;