import React, { useState } from "react";

import FormField from "../components/CustomForm/FormField";
import Button from "../components/CustomButton/CustomButton";

import { useAuthContext } from "../context/AuthProvider";
import { useErrorHandler } from "../context/ErrorHandlerProvider";

import axios from "../api/axios";
import images from "../constants/images";

const Register = () => {
  const { auth, isLoading, isLoggedIn } = useAuthContext();
  const { handleError } = useErrorHandler();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activateToken, setActivateToken] = useState("");

  const register = async () => {
    setIsSubmitting(true);

    try {
      const { email, password, confirm_password } = form;
      const response = await axios.post("auth/register", { email, password, confirm_password });
      console.log(JSON.stringify(response));

      setActivateToken(response.data.activateToken);
      setShowSuccessMessage(true);

    } catch (error) {
      await handleError(error, handleFormError);

    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormError = (errorMesssage, input) => {
    console.log("handleFormError triggering for " + input + " with message " + errorMesssage);
    setFormErrors(prev => ( {...prev, [input]: errorMesssage} ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleFormError(null, name);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = async () => {
    let isValid = true;

    const { email, password, confirm_password } = form;

    if (!email || email.indexOf("@") < 0) {
      handleFormError("Please input a valid email", "email");
      isValid = false;
    }

    if ( !password ) {
      handleFormError("Please input your password", "password");
      isValid = false;
    }

    if ( !confirm_password ) {
      handleFormError("Please confirm your password", "confirm_password");
      isValid = false;
    }

    if ( password && confirm_password && password !== confirm_password ) {
      handleFormError("The confirm password does not match password", "confirm_password");
      isValid = false;
    }

    if (isValid) {
      await register();
    }
  };

  // TO DO: initiateLogOut function
  const initiateLogOut = async () => {

  };

  // TO DO: handle case where user has already logged in & go to register page
  if (!isLoading && isLoggedIn && auth.username) {
    return (
      <div>
      </div>
    )
  }

  return (
    <div
      className="w-11/12 h-[60vh] max-w-3xl bg-sidebar rounded-xl shadow-md flex overflow-hidden"
    > 
      
      <div 
        className="hidden sm:block w-2/5 bg-purple relative"
        style={{
          backgroundImage: `url('${images["bg_dead_forest"]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img 
          src={images["knight_run_gif"]}
          className="absolute top-3/8 left-1/11 w-70 h-70 object-cover pointer-events-none"
        />
      </div>

      <div className="px-10 py-15 flex-1">
        { showSuccessMessage && (
          <>
            <p className="text-4xl text-yellow font-accent tracking-wide font-medium"> 
              Account created!
            </p>
            <p className="text-5xl text-yellow font-accent tracking-wide font-medium mt-5"> 
              💪  
            </p>
          </>
          
        )}

        { !showSuccessMessage && (
          <>
            <p className="text-4xl text-yellow font-accent tracking-wide font-medium"> 
              Create a hero profile  
            </p>
            <p className="text-5xl text-yellow font-accent tracking-wide font-medium mt-5"> 
              🌟  
            </p>
          </>
        )}

        { showSuccessMessage && (
          <div className="mt-7 px-3 py-3 rounded-lg text-green font-sans tracking-wide">
            <p className="font-bold">Nicely done!</p> 
            <p>Let's activate your profile and get started</p>
            {/* <p>activate token: {activateToken}</p> */}
            <Button 
              title="Activate"
              size="lg"
              containerStyles="mt-5"
              handlePress={()=>{}}
            />
          </div>
        )}

        { !showSuccessMessage && (
          <>
            <div className="flex-row mt-7 px-3">
              <FormField 
                label=""
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                error={formErrors.email}
                placeholder="your email"
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

              <FormField 
                label=""
                name="confirm_password"
                type="password"
                value={form.confirm_password}
                onChange={handleInputChange}
                error={formErrors.confirm_password}
                placeholder="confirm password"
                required={true}
                className="mb-3"
                fullWidth={true}
              />

            </div>

            <div className="mt-10 px-3">
              <Button 
                title="Sign up"
                icon="🚀"
                size="lg"
                fullWidth={true}
                handlePress={validate}
                isLoading={isSubmitting}
              />
              <p className="mt-2 text-sm text-gray tracking-wider">
                Already has an account? Sign in here
              </p>
            </div>
          </>
        )}
        
      </div>
      
    </div>
  )
};

export default Register;