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
  let type = "unknown";

  if (error?.response) {
    type = "response";
    const status = error.response.status;
    message = error.response.data.message || message;
    let details = error.response.data.details || details;

    // Normalize details to string
    if (Array.isArray(details)) {
      details = details.join(" ");
    } else if (typeof details !== "string") {
      details = "Please try again.";
    }

    if (typeof details !== "string") {
      details = "Please try again.";
    }

    console.log("error details: " + details);
    console.log(`error status === 400: ${status === 400}`);
    console.log("has handleFormError: " + handleFormError);

    // handle form errors by field
    if (handleFormError && (status === 400 || status === 401)) {
      type = "form";
      if (details.includes("username")) {
        handleFormError(details, "username");
      } else if (details.includes("email")) {
        handleFormError(details, "email");
      } else if (details.includes("password")) {
        handleFormError(details, "password");
      } else if (details.includes("description")) {
        handleFormError(details, "description");
      } else if (details.includes("title")) {
        handleFormError(details, "title");
      } else if (details.includes("type")) {
        handleFormError(details, "type");
      } else if (details.includes("due_date")) {
        handleFormError(details, "due_date");
      } else if (details.includes("parent_quest")) {
        handleFormError(details, "parent_quest");
      } else {
        type = "unknown";
        message = "Unknown form error";
      }
    }

  } else if (error?.request) {
    type = "request";
    message = "No response from server";
    details = "Please check your internet connection.";

  } else {
    type = "unknown";
    message = "Unexpected error";
    details = "Something went wrong. Please try again.";
  }

  return { type, status, message, details };

};

export default handleGlobalError;