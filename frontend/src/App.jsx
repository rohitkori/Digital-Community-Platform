import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../src/pages/Homepage";
import Dashboard from "../src/pages/Dashboard";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import Navbar from "./components/Navbar";
import Quest from "./pages/Quest";
import PrivateRoute from "../src/context/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quests" element={<Quest />} />
          </Routes>
          <PrivateRoute path="/dashboard" element={<Dashboard />} />
          <Toaster />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
