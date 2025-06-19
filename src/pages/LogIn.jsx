import { useState } from "react";

import { useAuthContext } from "../context/AuthProvider";
import { useErrorHandler } from "../context/ErrorHandlerProvider";

import storage from "../utils/Storage";

const LogIn = () => {
  const { auth, setAuth, logIn, isLoggedIn, isLoading, logOut } = useAuthContext();
  const { handleError } = useErrorHandler();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  return (
    <div></div>
  )
};

export default LogIn;