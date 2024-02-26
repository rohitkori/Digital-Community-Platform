import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../src/pages/Homepage";
import Dashboard from "../src/pages/Dashboard";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import PrivateRoute from "../src/context/PrivateRoute";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <PrivateRoute path="/dashboard" element={<Dashboard />} />
      </Router>
    </>
  );
}

export default App;
