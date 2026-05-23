import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Interview from "./pages/Interview";
import History from "./pages/History";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ChatAssistant from "./pages/ChatAssistant";
import CodingInterview from "./pages/CodingInterview";
import { ToastContainer } from "react-toastify";


function App() {


    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/interview"
                    element={
                        <ProtectedRoute>
                            <Interview />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/resume"
                    element={
                        <ProtectedRoute>
                            <ResumeAnalyzer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <ChatAssistant />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/coding"
                    element={
                        <ProtectedRoute>
                            <CodingInterview />
                        </ProtectedRoute>
                    }
                />

            </Routes>
            <ToastContainer />

        </BrowserRouter>
    );

}

export default App;