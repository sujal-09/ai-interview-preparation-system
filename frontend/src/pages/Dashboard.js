import Sidebar from "../components/Sidebar";

function Dashboard() {

    return (

        <div className="flex bg-slate-950 text-white min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-5xl font-bold mb-4">

                    Welcome Back 👋

                </h1>

                <p className="text-slate-400 text-lg mb-10">

                    Practice interviews with AI-powered analytics

                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 rounded-3xl shadow-xl">

                        <h2 className="text-2xl font-bold mb-4">

                            AI Interviews

                        </h2>

                        <p className="text-lg">

                            Practice real interview questions
                        </p>

                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-3xl shadow-xl">

                        <h2 className="text-2xl font-bold mb-4">

                            Resume Analyzer

                        </h2>

                        <p className="text-lg">

                            Improve ATS score instantly
                        </p>

                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 rounded-3xl shadow-xl">

                        <h2 className="text-2xl font-bold mb-4">

                            Analytics

                        </h2>

                        <p className="text-lg">

                            Track your interview growth
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;