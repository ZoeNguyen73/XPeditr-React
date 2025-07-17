import { useEffect } from "react";

import { axiosPrivate } from "../api/axios";
import { useAuthContext } from "../context/AuthProvider";
import useRefreshToken from "./useRefreshToken";
import handleGlobalError from "../utils/GlobalErrorHandler";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuthContext();

  useEffect(() => {
    console.log("[useAxiosPrivate] Effect ran", auth?.accessToken);
    console.log("[useAxiosPrivate] Setting up interceptors");
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {

        const prevRequest = error?.config;

        if (!prevRequest) {
          console.warn("[useAxiosPrivate] Error has no config — skipping refresh");
        }

        // if the 1st request returns 401 Unauthorized and it hasn't been re-requested yet
        if (error?.response?.status === 401 && !prevRequest?._retry) {
          prevRequest._retry = true;

          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest); // retry the request

          } catch (refreshError) {
            handleGlobalError(refreshError);
            return Promise.reject(refreshError); // Reject the original error where refresh fails
          }
        }

        return Promise.reject(error); // fallback reject in case the re-request fails
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }

  }, [auth, refresh]);

  return axiosPrivate;

};

export default useAxiosPrivate;