import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthProvider";
import { useErrorHandler } from "../context/ErrorHandlerProvider";

import storage from "../utils/Storage";
import Avatar from "../components/Avatar/Avatar";
import Button from "../components/CustomButton/CustomButton";
import FormField from "../components/CustomForm/FormField";

import images from "../constants/images";
import MessageBox from "../components/MessageBox";

const LogIn = () => {
  const { auth, setAuth, logIn, isLoggedIn, isLoading, logOut } = useAuthContext();
  const { handleError } = useErrorHandler();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleFormError = ( errorMessage, input ) => {
    setFormErrors(prev => ({...prev, [input]: errorMessage}));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleFormError(null, name);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const initiateLogOut = async () => {
    try {
      setShowMessageBox(false);
      setErrorMessage("");
      await logOut();
      navigate("/login");
    } catch (error) {
      const parsedError = await handleError(error);
      if (parsedError && parsedError?.type !== "form") {
        setErrorMessage(`${parsedError.message}. ${parsedError.details}`);
        setShowMessageBox(true);
      }
    }
  };

  const validate = async () => {
    try {
      setIsSubmitting(true);
      setShowMessageBox(false);
      setErrorMessage("");

      let isValid = true;

      const { username, password } = form;

      if (!username) {
        handleFormError("Please input your username", "username");
        isValid = false;
      }

      if ( !password ) {
        handleFormError("Please input your password", "password");
        isValid = false;
      }

      if (!isValid) return;

      await logIn({ username, password });
      navigate("/dashboard");

    } catch (error) {
      const parsedError = await handleError(error, handleFormError);
      if (parsedError && parsedError?.type !== "form") {
        setErrorMessage(`${parsedError.message}. ${parsedError.details}`);
        setShowMessageBox(true);
      }
    } finally {
      setIsSubmitting(false);
    }
    
  };

  // if user is already logged in and land on log in page
  if (!isLoading && isLoggedIn && auth.username) {
    return (
      <div className="h-full w-1/2 min-w-[800px] flex flex-col items-center">
        <p className="text-4xl text-text font-accent tracking-wider mb-5">
          Welcome back, <span className="font-bold text-yellow">{auth.username}</span> 🫡
        </p>
        <Avatar 
          avatarName={auth.avatar}
          size="sm"
        />
        {showMessageBox && errorMessage && (
          <MessageBox content={errorMessage} type="error" />
        )}
        <Button 
          title="Go to Dashboard"
          handlePress={() => navigate("/dashboard")}
          containerStyles="mt-10"
          size="lg"
        />
        <div className="mt-3">
          <p className="text-text text-sm tracking-wide">
            Not <span className="font-medium">{auth.username}</span> ? 
            <span 
              className="ml-2 text-blue cursor-pointer font-bold hover:underline" 
              onClick={initiateLogOut}
            >
              Log out
            </span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-11/12 h-[60vh] max-w-3xl bg-sidebar rounded-xl shadow-md flex flex-col justify-center items-center overflow-hidden">
      <p className="text-4xl text-yellow font-accent tracking-wider font-medium">
        Welcome back, Hero!
      </p>
      <p className="text-lg text-text tracking-wide mt-2">Your day of adventure awaits 🎇</p>
      <img src={images.knight_attackcombo2hit_gif} />

      <div className="flex-row mt-10 px-3">
        {showMessageBox && errorMessage && (
          <MessageBox content={errorMessage} type="error" containerStyles="mb-3"/>
        )}
        <FormField 
          label=""
          name="username"
          type="text"
          value={form.username}
          onChange={handleInputChange}
          error={formErrors.username}
          placeholder="your username"
          required={true}
          className="mb-3"
          fullWidth={true}
        />

        <FormField 
          label=""
          name="password"
          type="password"
          value={form.password}
          onChange={handleInputChange}
          error={formErrors.password}
          placeholder="password"
          required={true}
          className="mb-3"
          fullWidth={true}
        />
      </div>
      <Button 
        title="Log In"
        handlePress={validate}
        containerStyles="mt-7"
        size="lg"
        isLoading={isSubmitting}
      />
      <div className="mt-3">
        <p className="text-text text-sm tracking-wide">
          Do not have an account? 
          <span 
            className="ml-2 text-blue cursor-pointer font-bold hover:underline" 
            onClick={() => navigate("/register")}
          >
            Register for free
          </span>
        </p>
      </div>
    </div>
  )
};

export default LogIn;