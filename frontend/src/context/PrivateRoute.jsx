import { useState } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
const PrivateRoute = ({ path, element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return isAuthenticated ? (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
