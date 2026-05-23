import {
    FaHome,
    FaRobot,
    FaHistory,
    FaFileAlt,
    FaChartBar,
    FaSignOutAlt,
    FaComments,
    FaCode
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    const menuItems = [

        {
            title: "Dashboard",
            icon: <FaHome />,
            path: "/dashboard"
        },

        {
            title: "AI Interview",
            icon: <FaRobot />,
            path: "/interview"
        },

        {
            title: "Resume Analyzer",
            icon: <FaFileAlt />,
            path: "/resume"
        },

        {
            title: "History",
            icon: <FaHistory />,
            path: "/history"
        },
        {
            title: "Coding Round",
            icon: <FaCode />,
            path: "/coding"
        },
        {
            title: "AI Assistant",
            icon: <FaComments />,
            path: "/chat"
        }

    ];

    return (

        <div className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

            <h1 className="text-3xl font-bold text-cyan-400 mb-10">

                AI Prep

            </h1>

            <div className="space-y-4">

                {
                    menuItems.map((item) => (

                        <div
                            key={item.title}
                            onClick={() =>
                                navigate(item.path)
                            }
                            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300

                            ${
                                location.pathname === item.path
                                    ? "bg-cyan-500 text-white"
                                    : "hover:bg-slate-800 text-slate-300"
                            }`}
                        >

                            <span className="text-xl">

                                {item.icon}

                            </span>

                            <span className="font-semibold">

                                {item.title}

                            </span>

                        </div>
                    ))
                }

                <div
                    onClick={logout}
                    className="flex items-center gap-4 p-4 rounded-xl cursor-pointer hover:bg-red-500 transition-all duration-300 text-slate-300 mt-10"
                >

                    <FaSignOutAlt />

                    <span className="font-semibold">
                        Logout
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Sidebar;