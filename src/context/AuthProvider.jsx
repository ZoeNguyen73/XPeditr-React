import { createContext, useContext, useState, useEffect } from "react";

import axios from "../api/axios";
import storage from "../utils/Storage";
import handleGlobalError from "../utils/GlobalErrorHandler";

const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState({
    username: "",
    accessToken: "",
    avatar: "",
  });

  const logIn = async ({ username, password }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "auth/login",
        { username, password }
      );

      const { accessToken, refreshToken, avatar } = response.data;

      storage.setItem("username", username);
      storage.setItem("accessToken", accessToken);
      storage.setItem("refreshToken", refreshToken);
      storage.setItem("avatar", avatar);

      setAuth({ username, accessToken, avatar });
      setIsLoggedIn(true);
    } catch (error) {
      handleGlobalError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setIsLoading(true);
      const refreshToken = storage.getItem("refreshToken");

      await axios.delete(
        "/auth/logout",
        { data: { refreshToken }}
      );

      storage.removeItem("username");
      storage.removeItem("accessToken");
      storage.removeItem("refreshToken");
      storage.removeItem("avatar");

      setAuth({
        username: "",
        accessToken: "",
        avatar: "",
      });
      setIsLoggedIn(false);

    } catch (error) {
      handleGlobalError(error);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUsername = storage.getItem("username");
        const currentAccessToken = storage.getItem("accessToken");
        const currentRefreshToken = storage.getItem("refreshToken");
        const currentAvatar = storage.getItem("avatar");

        if (!currentUsername || !currentAccessToken || !currentRefreshToken || !currentAvatar) {
          setAuth({
            username: "",
            accessToken: "",
            avatar: "",
          });
          setIsLoggedIn(false);
        } else {
          setAuth({
            username: currentUsername,
            accessToken: currentAccessToken,
            avatar: currentAvatar,
          });
          setIsLoggedIn(true);
        }
        
      } catch (error) {
        setIsLoggedIn(false);
        handleGlobalError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, [])

  return (
    <AuthContext.Provider value={{ logIn, logOut, auth, isLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  )

};

export default AuthProvider;