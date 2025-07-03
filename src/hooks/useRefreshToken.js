import { useCallback } from "react";

import { useAuthContext } from "../context/AuthProvider";
import axios from "../api/axios";

import storage from "../utils/Storage";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  // useCallback => prevents unnecessary re-renders or dependencies
  const refresh = useCallback(async () => {
    const refreshToken = storage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await axios.post("auth/refresh", { refreshToken });
      const newAccessToken = response.data.accessToken;

      setAuth(prev => ({ ...prev, accessToken: newAccessToken }));
      storage.setItem("accessToken", newAccessToken);

      return newAccessToken;
    } catch (error) {
      throw error;
    }
  }, [setAuth]);

  return refresh;

};

export default useRefreshToken;