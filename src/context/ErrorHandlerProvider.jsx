import { createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import handleGlobalError from "../utils/GlobalErrorHandler";

const ErrorHandlerContext = createContext();
export const useErrorHandler = () => useContext(ErrorHandlerContext);

export const ErrorHandlerProvider = ({ children }) => {
  // const navigate = useNavigate();

  const handleError = async (error, handleFormError) => {
    try {
      if (error.response) console.log("error response received: " + JSON.stringify(error.response?.data));
      if (error.request) console.log("error request received: " + JSON.stringify(error.request?.data));
      console.log("unknown error received: " + JSON.stringify(error));
      if (
        // handle session expired i.e. refresh token already expired
        error.response?.data?.details === "Unable to verify refresh token" &&
        error.response?.data?.name === "TokenExpiredError"

      ) {

        toast.error("Session expired. Please log in again.");

        // TO DO: change this  to an alert box
        // with redirection to log in page
        // also clear local storage/session storage

      } else {
        return handleGlobalError(error, handleFormError);
        
      }
    } catch (e) {
      console.error(e);
      return handleGlobalError(e);
    }
    
  };

  return (
    <ErrorHandlerContext.Provider value={{ handleError }}>
      { children }
    </ErrorHandlerContext.Provider>
  )
};