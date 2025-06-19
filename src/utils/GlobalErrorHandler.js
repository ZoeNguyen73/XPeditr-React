import { toast } from "react-hot-toast";

/**
 * Handles API/global errors and optionally passes form field errors to a callback.
 * If no form handler is provided, it returns a parsed error object to the caller.
 *
 * @param {Error} error - Axios error object
 * @param {Function} [handleFormError] - Optional callback to handle specific form field errors
 * @returns {Object|undefined} Returns parsed error if `handleFormError` not provided
 */

const handleGlobalError = (error, handleFormError) => {
  let status = 0;
  let message = "An error occurred";
  let details = "Please try again.";

  if (error?.response) {
    const status = error.response.status;
    const message = error.response.data.message || message;
    let details = error.response.data.details || details;

    if (typeof details !== "string") {
      details = "Please try again.";
    }

    console.log("error details: " + details);
    console.log(`error status === 400: ${status === 400}`);
    console.log("has handleFormError: " + handleFormError);

    if (handleFormError && (status === 400 || status === 401)) {
      if (details.includes("username")) {
        handleFormError(details, "username");
      } else if (details.includes("email")) {
        handleFormError(details, "email");
      } else if (details.includes("password")) {
        handleFormError(details, "password");
      } else {
        console.log("toast message from GlobalErrorHandler should be displayed here...");
        toast.error(`${message}: ${details}`);
      }
    } else {
      return {
        type: "response",
        status,
        message,
        details,
      };
    }

  } else if (error?.request) {
    const fallbackMessage = "No response from server. Please check your internet.";

    if (!handleFormError) {
      return {
        type: "request",
        message: fallbackMessage,
      };
    }

    toast.error(fallbackMessage);

  } else {
    const fallbackMessage = "Unexpected error. Please try again.";
    
    if (!handleFormError) {
      return {
        type: "unknown",
        message: fallbackMessage,
      };
    }

    toast.error(fallbackMessage);
  }

};

export default handleGlobalError;