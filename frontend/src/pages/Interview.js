import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function Interview() {

    const [role, setRole] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [questions, setQuestions] = useState("");
    const [loading, setLoading] = useState(false);

    const [selectedQuestion, setSelectedQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [evaluation, setEvaluation] = useState("");

    const [listening, setListening] = useState(false);

    const [company, setCompany] = useState("");

    const [interviewType, setInterviewType] =
        useState("");

    const generateQuestions = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8080/api/interview/generate",
                {
                    role,
                    difficulty,
                    company,
                    interviewType
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQuestions(response.data.response);

        } catch (error) {

            console.log(error);

            toast.error("Failed to generate questions");

        } finally {

            setLoading(false);
        }
    };
    const evaluateAnswer = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8080/api/interview/evaluate",
                {
                    question: selectedQuestion,
                    answer: answer
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEvaluation(response.data);

        } catch (error) {

            console.log(error);

            alert("Evaluation failed");
        }
    };


    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            alert("Speech Recognition not supported");

            return;
        }

        const recognition =
            new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.start();

        setListening(true);

        recognition.onresult = (event) => {

            const transcript =
                event.results[0][0].transcript;

            setAnswer(transcript);

            setListening(false);
        };

        recognition.onerror = () => {

            setListening(false);

            alert("Speech recognition failed");
        };
    };

    const speakQuestions = () => {

        if (!questions) {

            alert("Generate questions first");

            return;
        }

        const speech =
            new SpeechSynthesisUtterance(questions);

        speech.lang = "en-US";

        speech.rate = 1;

        window.speechSynthesis.speak(speech);
    };

    const stopSpeaking = () => {

        window.speechSynthesis.cancel();
    };

    return (

        <div className="flex bg-slate-950 text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-5xl font-bold mb-8">
                    AI Mock Interview
                </h1>

                <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-slate-800 p-3 rounded-lg"
                        >
                            <option value="">
                                Select Role
                            </option>

                            <option value="Java Developer">
                                Java Developer
                            </option>

                            <option value="Frontend Developer">
                                Frontend Developer
                            </option>

                            <option value="Full Stack Developer">
                                Full Stack Developer
                            </option>

                        </select>

                        <select
                            value={company}
                            onChange={(e) =>
                                setCompany(e.target.value)
                            }
                            className="bg-slate-800 p-3 rounded-lg"
                        >

                            <option value="">
                                Select Company
                            </option>

                            <option value="TCS">
                                TCS
                            </option>

                            <option value="Infosys">
                                Infosys
                            </option>

                            <option value="Wipro">
                                Wipro
                            </option>

                            <option value="Accenture">
                                Accenture
                            </option>

                            <option value="Amazon">
                                Amazon
                            </option>

                            <option value="Google">
                                Google
                            </option>

                            <option value="Microsoft">
                                Microsoft
                            </option>

                        </select>

                        <select
                            value={interviewType}
                            onChange={(e) =>
                                setInterviewType(e.target.value)
                            }
                            className="bg-slate-800 p-3 rounded-lg"
                        >

                            <option value="">
                                Interview Type
                            </option>

                            <option value="Technical">
                                Technical
                            </option>

                            <option value="HR">
                                HR
                            </option>

                            <option value="DSA">
                                DSA
                            </option>

                            <option value="System Design">
                                System Design
                            </option>

                        </select>

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(e.target.value)
                            }
                            className="bg-slate-800 p-3 rounded-lg"
                        >
                            <option value="">
                                Select Difficulty
                            </option>

                            <option value="Easy">
                                Easy
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Hard">
                                Hard
                            </option>

                        </select>

                    </div>

                    <button
                        onClick={generateQuestions}
                        className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold"
                    >
                        Generate Questions
                    </button>

                    <button
                        onClick={speakQuestions}
                        className="ml-4 bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-bold"
                    >
                        Speak Questions
                    </button>

                    <button
                        onClick={stopSpeaking}
                        className="ml-4 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold"
                    >
                        Stop Speaking
                    </button>

                </div>

                {
                    loading && (
                        <h2 className="mt-8 text-xl">
                            Generating Questions...
                        </h2>
                    )
                }

                {
                    questions && (

                        <div className="mt-8 bg-slate-900 p-8 rounded-2xl whitespace-pre-wrap">

                            {questions}

                        </div>
                    )
                }
                {
                    questions && (

                        <div className="mt-8 bg-slate-900 p-8 rounded-2xl">

                            <h2 className="text-2xl font-bold mb-4">
                                Answer Evaluation
                            </h2>

                            <textarea
                                placeholder="Paste one interview question here"
                                value={selectedQuestion}
                                onChange={(e) =>
                                    setSelectedQuestion(e.target.value)
                                }
                                className="w-full p-4 rounded-lg bg-slate-800 mb-4"
                                rows="4"
                            />

                            <textarea
                                placeholder="Write your answer here"
                                value={answer}
                                onChange={(e) =>
                                    setAnswer(e.target.value)
                                }
                                className="w-full p-4 rounded-lg bg-slate-800 mb-4"
                                rows="6"
                            />
                            <button
                                onClick={startListening}
                                className="mb-4 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-bold"
                            >
                                {
                                    listening
                                        ? "Listening..."
                                        : "🎤 Speak Answer"
                                }
                            </button>

                            <button
                                onClick={evaluateAnswer}
                                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
                            >
                                Evaluate Answer
                            </button>

                            {
                                evaluation && (

                                    <div className="mt-6 whitespace-pre-wrap bg-slate-800 p-6 rounded-xl">

                                        {evaluation}

                                    </div>
                                )
                            }

                        </div>
                    )
                }


            </div>

        </div>
    );
}

export default Interview;