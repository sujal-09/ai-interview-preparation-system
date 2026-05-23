import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function History() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/interview/history",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setHistory(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="flex bg-slate-950 text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10 overflow-auto">

                <div className="max-w-6xl mx-auto">

                    <h1 className="text-5xl font-bold mb-3">

                        Interview History

                    </h1>

                    <p className="text-slate-400 text-lg mb-10">

                        Track your previous interview attempts
                        and AI evaluations.

                    </p>

                    <div className="grid gap-8">

                        {
                            history.map((item) => (

                                <div
                                    key={item.id}
                                    className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl"
                                >

                                    <div className="flex justify-between items-center mb-6">

                                        <h2 className="text-3xl font-bold text-cyan-400">

                                            {item.role}

                                        </h2>

                                        <span className="text-slate-400">

                                            Interview #{item.id}

                                        </span>

                                    </div>

                                    <div className="space-y-6">

                                        <div>

                                            <h3 className="text-xl font-semibold mb-2">

                                                Question

                                            </h3>

                                            <p className="text-slate-300 leading-7">

                                                {item.question}

                                            </p>

                                        </div>

                                        <div>

                                            <h3 className="text-xl font-semibold mb-2">

                                                Your Answer

                                            </h3>

                                            <p className="text-slate-300 leading-7">

                                                {item.answer}

                                            </p>

                                        </div>

                                        <div>

                                            <h3 className="text-xl font-semibold mb-2 text-green-400">

                                                AI Feedback

                                            </h3>

                                            <p className="text-slate-300 whitespace-pre-wrap leading-7">

                                                {item.feedback}

                                            </p>

                                        </div>

                                    </div>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default History;