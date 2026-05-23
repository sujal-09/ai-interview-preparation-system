import { useState } from "react";

import axios from "axios";

import Editor from "@monaco-editor/react";

import Sidebar from "../components/Sidebar";

import codingProblems
from "../data/codingProblems";

function CodingInterview() {

    const [language, setLanguage] =
        useState("java");

    const [output, setOutput] =
        useState("");

    const [review, setReview] =
                useState("");

    const [selectedProblem, setSelectedProblem] =
        useState(codingProblems[0]);

    const [code, setCode] = useState(`public class Main {

    public static void main(String[] args) {

        System.out.println("Hello World");
    }
}`);

    const languageMap = {
        java: "java",
        python: "python",
        cpp: "cpp",
        javascript: "javascript"
    };

    const runCode = async () => {

        try {

            setOutput("Running code...");

            const token =
                localStorage.getItem("token");

            const response = await axios.post(

                "http://localhost:8080/api/interview/execute",

                {
                    language:
                        languageMap[language],

                    code
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setOutput(response.data);

        } catch (error) {

            console.log(error);

            setOutput("Code execution failed");
        }
        };

        const reviewCode = async () => {

            try {

                setReview("AI reviewing code...");

                const token =
                    localStorage.getItem("token");

                const response = await axios.post(

                    "http://localhost:8080/api/interview/review-code",

                    {
                        language,
                        code
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setReview(response.data);

            } catch (error) {

                console.log(error);

                setReview("AI review failed");
            }
        };


    return (

        <div className="flex bg-slate-950 text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10 overflow-auto">

                <div className="max-w-7xl mx-auto">

                    <h1 className="text-5xl font-bold mb-3">

                        Coding Interview

                    </h1>

                    <p className="text-slate-400 text-lg mb-10">

                        Practice coding interviews with
                        real-time code execution.

                    </p>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

                        <div className="flex justify-between items-center mb-6">

                            <select
                                value={language}
                                onChange={(e) =>
                                    setLanguage(
                                        e.target.value
                                    )
                                }
                                className="bg-slate-800 p-3 rounded-xl"
                            >

                                <option value="java">
                                    Java
                                </option>

                                <option value="python">
                                    Python
                                </option>

                                <option value="cpp">
                                    C++
                                </option>

                                <option value="javascript">
                                    JavaScript
                                </option>

                            </select>

                            <button
                                onClick={runCode}
                                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
                            >
                                Run Code
                            </button>
                            <button
                                onClick={reviewCode}
                                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold ml-4"
                            >
                                AI Review
                            </button>

                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">

                            <div className="flex justify-between items-center mb-6">

                                <h2 className="text-3xl font-bold">

                                    Coding Problem

                                </h2>

                                <select
                                    onChange={(e) => {

                                        const problem =
                                            codingProblems.find(
                                                (p) =>
                                                    p.id ===
                                                    Number(e.target.value)
                                            );

                                        setSelectedProblem(problem);
                                    }}
                                    className="bg-slate-800 p-3 rounded-xl"
                                >

                                    {
                                        codingProblems.map((problem) => (

                                            <option
                                                key={problem.id}
                                                value={problem.id}
                                            >

                                                {problem.title}

                                            </option>
                                        ))
                                    }

                                </select>

                            </div>

                            <div className="space-y-5">

                                <div className="flex gap-4">

                                    <span className="bg-cyan-500 px-4 py-2 rounded-xl">

                                        {selectedProblem.difficulty}

                                    </span>

                                    <span className="bg-purple-500 px-4 py-2 rounded-xl">

                                        {selectedProblem.topic}

                                    </span>

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold mb-2">

                                        Problem Description

                                    </h3>

                                    <p className="text-slate-300 leading-8">

                                        {selectedProblem.description}

                                    </p>

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold mb-2">

                                        Sample Input

                                    </h3>

                                    <div className="bg-slate-800 p-4 rounded-xl">

                                        {selectedProblem.input}

                                    </div>

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold mb-2">

                                        Expected Output

                                    </h3>

                                    <div className="bg-slate-800 p-4 rounded-xl">

                                        {selectedProblem.output}

                                    </div>

                                </div>

                            </div>

                        </div>

                        <Editor
                            height="600px"
                            theme="vs-dark"
                            language={language}
                            value={code}
                            onChange={(value) =>
                                setCode(value)
                            }
                        />

                        <div className="mt-6 bg-black rounded-2xl p-6 min-h-[150px] border border-slate-700">

                            <h2 className="text-green-400 font-bold mb-4">

                                Output Console


                            </h2>



                            <pre className="whitespace-pre-wrap text-slate-300">

                                {output}



                            </pre>

                        </div>
                        <div className="mt-6 bg-slate-900 border border-slate-700 rounded-2xl p-6">

                            <h2 className="text-cyan-400 font-bold mb-4 text-xl">

                                AI Code Review

                            </h2>

                            <pre className="whitespace-pre-wrap text-slate-300 leading-8">

                                {review}

                            </pre>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CodingInterview;