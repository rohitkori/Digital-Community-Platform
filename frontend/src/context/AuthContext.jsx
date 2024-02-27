import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BACKEND_URL } from "../config";
import jwt_decode from "jwt-decode";

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
    name,
    email,
    city,
    phone,
    dateOfBirth,
    specializations,
    password,
    passwordConfirm
  ) => {
    const registerData = {
      name,
      email,
      city,
      phone,
      dateOfBirth,
      specializations,
      password,
      passwordConfirm,
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
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access_token));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("./dashboard");
      return response;
    }else {
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
          setUser(jwt_decode(authTokens.access_token));
        }
      } catch(e) {
        console.log(e)
        toast.error("Error decoding access token");
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
