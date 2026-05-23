import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <div className="flex justify-between items-center px-8 py-4 bg-slate-900 border-b border-slate-700">

            <h1 className="text-2xl font-bold text-cyan-400">
                AI Interview System
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
                Logout
            </button>

        </div>
    );
}

export default Navbar;