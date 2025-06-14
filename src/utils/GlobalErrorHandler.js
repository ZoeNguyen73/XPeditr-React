import { toast } from "react-hot-toast";

const handleGlobalError = (error, handleFormError) => {
  if (error.response) {

    const status = error.response.status;
    const message = error.response.data.message || "An error occurred";
    let details = error.response.data.details || "Please try again.";

    if (typeof details !== "string") {
      details = "Please try again.";
    }

    if (
      handleFormError &&
      (status === 400 || status === 401)
    ) {
      if (details.includes("username")) {
        handleFormError("username", details);
      } else if (details.includes("email")) {
        handleFormError("email", details);
      } else if (details.includes("password")) {
        handleFormError("password", details);
      } else {
        // to include toast or popup modal here
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