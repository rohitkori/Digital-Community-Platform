import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BACKEND_URL } from "../config";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const registerUser = async (
    firstName,
    email,
    city,
    phone,
    dateOfBirth,
    specializations,
    password
  ) => {
    const registerData = {
      firstName,
      email,
      city,
      phone,
      dateOfBirth,
      specializations,
      password,
    };

    const response = await fetch(`${API_BACKEND_URL}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      navigate("/login");
      return response;
    } else if (response.status === 422) {
      toast.error("Validation error");
    } else {
      throw response.statusText;
    }
  };

  const loginUser = async (email, password) => {
    const loginData = {
      email,
      password,
    };

    const response = await fetch(`${API_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.status == 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("./dashboard");
      return response;
    } else if (response.status == 422) {
      toast.error("Validation error");
    } else {
      throw response.statusText;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/register");
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    const decodeTokens = async () => {
      try {
        if (authTokens) {
          setUser(jwt_decode(authTokens.access));
        }
      } catch {
        toast.error("Error decoding access token:", error);
      }
    };
    decodeTokens();
  }, [authTokens]);

  const authContextValue = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
