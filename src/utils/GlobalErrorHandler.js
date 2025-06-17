import { toast } from "react-hot-toast";

const handleGlobalError = (error, handleFormError) => {
  if (error.response) {

    const status = error.response.status;
    const message = error.response.data.message || "An error occurred";
    let details = error.response.data.details || "Please try again.";

    if (typeof details !== "string") {
      details = "Please try again.";
    }

    console.log("error details: " + details);
    console.log(`error status === 400: ${status === 400}`);
    console.log("has handleFormError: " + handleFormError);

    if (
      handleFormError &&
      (status === 400 || status === 401)
    ) {
      if (details.includes("username")) {
        handleFormError(details, "username");
      } else if (details.includes("email")) {
        handleFormError(details, "email");
      } else if (details.includes("password")) {
        handleFormError(details, "password");
      } else {
        // to include toast or popup modal here
        console.log("toast message should be displayed here...");
        toast.error(`${message}: ${details}`);
      }
    } else {
      // to include toast or popup modal here
      toast.error(`${message}: ${details}`);
    }

  } else if (error.request) {
    // to include toast or popup modal here
    toast.error("No response from server. Please check your internet.");

  } else {
    // to include toast or popup modal here
    toast.error("No response from server. Please check your internet.");
  }

};

export default handleGlobalError;