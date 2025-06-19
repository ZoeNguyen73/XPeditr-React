import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthProvider";
import { useErrorHandler } from "../context/ErrorHandlerProvider";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import FormField from "../components/CustomForm/FormField";
import Button from "../components/CustomButton/CustomButton";
import AvatarSelector from "../components/Avatar/AvatarSelector";
import MessageBox from "../components/MessageBox";

import images from "../constants/images";
import storage from "../utils/Storage";

const ProfileSetup = () => {
  const { auth, setAuth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();
  const { handleError } = useErrorHandler();
  const navigate = useNavigate();

  const [ formErrors, setFormErrors ] = useState({});
  const [ defaultUsername, setDefaultUsername ] = useState("");
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ updateSuccessful, setUpdateSuccesssful]  = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ showMessageBox, setShowMessageBox ] = useState(false);

  const [ form, setForm ] = useState({
    username: "",
    avatar: "",
  });

  const handleFormError = (errorMessage, input) => {
    setFormErrors(prev => ( {...prev, [input]: errorMessage} ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleFormError(null, name);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (avatarName) => {
    setForm((prev) => ({...prev, avatar: avatarName}))
  };

  const submitForm = async () => {
    try {
      setIsSubmitting(true);
      setShowMessageBox(false);
      setErrorMessage("");
      const newUsername = form.username;
      const newAvatar = form.avatar;

      console.log("auth: " + JSON.stringify(auth));
      
      const response = await axiosPrivate.put(
        `users/${defaultUsername}`,
        { username: newUsername, avatar: newAvatar }
      );
      
      storage.setItem("username", newUsername);
      storage.setItem("avatar", newAvatar);
      setAuth(prev => ({...prev, username: newUsername, avatar: newAvatar}));
      setUpdateSuccesssful(true);
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 800); 

    } catch (error) {
      const parsedError = await handleError(error, handleFormError);
      console.log("parsedError: " +  JSON.stringify(parsedError));
      if (parsedError && parsedError?.type !== "form") {
        setErrorMessage(`${parsedError.message}. ${parsedError.details}`);
        setShowMessageBox(true);
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("auth: " + JSON.stringify(auth));
    setDefaultUsername(auth.username);
    setForm({ username: auth.username, avatar: auth.avatar });
  }, [auth])

  return (
    <div className="h-full w-1/2 min-w-[800px]">
      <div className="mt-15 relative flex justify-center items-start">
        <img src={images["knight_crouchwalk_gif"]} className="w-50 h-auto" />
        <p className="absolute top-0 text-4xl font-accent tracking-wider font-medium text-yellow">
          One last step before we get started
        </p>
      </div>
      
      <div className="mt-5 flex flex-col items-center justify-center">

        { showMessageBox && errorMessage && (
          <MessageBox content={errorMessage} type="error"/>
        )}

        { updateSuccessful && (
          <div>
            <MessageBox content="Profile set up completed!" type="success"/>
            <p className="mt-2 tracking-wide text-sm text-text">Redirecting to dashboard...</p>
          </div>
        )}

        { !updateSuccessful && (
          <div className="flex flex-col items-center ">  
            <div className="px-5 w-3/4">
              <p className="mt-5 mb-2 text-gray font-sans tracking-wider text-sm">
                Choose your username
              </p>
              <FormField 
                name="username"
                value={form.username}
                onChange={handleInputChange}
                error={formErrors.username}
                required={true}
                className="mb-3 items-center"
                fullWidth={true}
                centerAlign={true}
              />
            </div>

            <p className="mt-7 text-gray font-sans tracking-wider text-sm">
              Choose your avatar
            </p>
            { formErrors.avatar && (
              <p className="text-error font-sans text-sm">
                {formErrors.avatar}
              </p>
            )}

            <p className="mb-4 text-xs font-italic font-sans text-gray">
              You can change your avatar later under profile settings
            </p>

            <AvatarSelector 
              containerStyles="max-w-3/4 justify-center gap-2"
              selectedAvatar={form.avatar}
              setSelectedAvatar={handleAvatarChange}
            />

            <Button
              handlePress={submitForm} 
              title="Confirm"
              containerStyles="mt-10"
              size="lg"
              isLoading={isSubmitting}
            />
          </div>
        )}
      </div>

    </div>
  )

};

export default ProfileSetup;