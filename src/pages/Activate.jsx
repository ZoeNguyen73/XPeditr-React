import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthProvider";
import { useErrorHandler } from "../context/ErrorHandlerProvider";

import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import storage from "../utils/Storage";
import images from "../constants/images";

import FormField from "../components/CustomForm/FormField";
import Button from "../components/CustomButton/CustomButton";
import AvatarSelector from "../components/Avatar/AvatarSelector";

const Activate = () => {
  const params = useParams();
  const activateToken = params.activateToken;

  const { auth, setAuth, setIsLoggedIn } = useAuthContext();
  const { handleError } = useErrorHandler();
  const axiosPrivate = useAxiosPrivate();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ username, setUsername ] = useState("");
  const [ needsProfileUpdate, setNeedsProfileUpdate ] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [ form, setForm ] = useState({
    username: "",
    avatar: "1a",
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
      const newUsername = form.username;
      const newAvatar = form.avatar;
      const response = await axiosPrivate.put(
        `users/${auth.username}`,
        { username: newUsername, avatar: newAvatar, needs_profile_update: false }
      );
      toast("Account successfully updated");

    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // activate account using the activateToken upon landing on the page
  useEffect(() => {
    const activate = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(`auth/activate?token=${activateToken}`);
        const { user, avatar, accessToken, refreshToken } = response.data;
        
        storage.setItem("username", username);
        storage.setItem("avatar", avatar);
        storage.setItem("accessToken", accessToken);
        storage.setItem("refreshToken", refreshToken);

        // setUsername(user.username);
        // setSelectedAvatar(user.avatar);
        setForm(prev => ({ ...prev, username: username, avatar: avatar}));
        setNeedsProfileUpdate(user.needs_profile_update);

        setAuth({ username: user.username, avatar: user.avatar, accessToken });
        setIsLoggedIn(true);

      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // activate();

  }, [])

  return (
    <div>
      { isLoading && (
        <p className="text-4xl font-accent tracking-wider font-medium text-yellow">Account activation in process...</p>
      )}

      { !isLoading && (
        <div>
          <div className="relative flex justify-center items-start">
            <img src={images["knight_crouchwalk_gif"]} className="w-50 h-auto" />
            <p className="absolute top-0 text-4xl font-accent tracking-wider font-medium text-yellow">
              Account activated successfully!
            </p>
          </div>
          
          {/* { needsProfileUpdate && ( */}
            <div className="mt-5 flex flex-col items-center justify-center">
              <p className="text-lg font-sans tracking-wider text-blue font-medium">
                One last step before we get started
              </p>

              <div className="px-5">
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

          {/* )} */}

        </div>
      )}
    </div>
    
  )
};

export default Activate;