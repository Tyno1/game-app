import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(savedUser);
  const [user, setUser] = useState(parsedUser);
  const [defaultUserType, setDefaultUserType] = useState(null);
  const [decodedToken, setDecodedToken] = useState();

  const login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/users/login", {
          email,
          password,
        })
        .then((res) => {
          // resolve(res);
          const decoded = decodeToken(res.data.token);
          console.log(res.data, decoded);
          setDecodedToken(decoded);
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);

          if (decoded?.userType?.name === "USER") {
            window.location.replace("/");
          } else {
            window.location.replace("/admin/dashboard");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const decodeUserToken = () => {
    const decoded = decodeToken(user?.token);

    return decoded;
  };

  const register = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/users/signup", data)
        .then((res) => {
          resolve(res);
          setUser(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  useEffect(() => {
    if (!user) {
      // window.
    }
  }, []);

  const fetchUserTypes = () => {
    // console.log(defaultUserType);
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/userTypes/all")
        .then((res) => {
          resolve(res);
          setDefaultUserType(
            res.data.find((d) => d.name.toLowerCase() === "user")
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  useEffect(() => {
    // fetchUserTypes();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        user,
        defaultUserType,
        decodedToken,
        decodeUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
