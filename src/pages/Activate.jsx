import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthProvider";
import { useErrorHandler } from "../context/ErrorHandlerProvider";

import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useOneTimeEffect from "../hooks/useOneTimeEffect";
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
  const [ activationSuccessful, setActivationSuccessful ] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ defaultUsername, setDefaultUsername ] = useState("");
  const [ needsProfileUpdate, setNeedsProfileUpdate ] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
      const newUsername = form.username;
      const newAvatar = form.avatar;

      console.log("auth: " + JSON.stringify(auth));
      
      const response = await axiosPrivate.put(
        `users/${defaultUsername}`,
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
  // using useOneTimeEffect hook to ensure the activation is not done twice
  useOneTimeEffect(() => {
    const activate = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(`auth/activate?token=${activateToken}`);
        const { user, accessToken, refreshToken } = response.data;
        const { username, avatar, needs_profile_update } = user;
        console.log("activate response: " + JSON.stringify(response.data));

        // Persist tokens and user info
        storage.setItem("username", username);
        storage.setItem("avatar", avatar);
        storage.setItem("accessToken", accessToken);
        storage.setItem("refreshToken", refreshToken);

        // Update frontend state
        setDefaultUsername(username);
        setForm(prev => ({ ...prev, username: username, avatar: avatar }));
        setNeedsProfileUpdate(needs_profile_update);

        setAuth({ username: username, avatar: avatar, accessToken });
        setIsLoggedIn(true);
        setActivationSuccessful(true);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    activate(); // run the activation once
  }, []);

  return (
    <div>
      { isLoading && (
        <p className="text-4xl font-accent tracking-wider font-medium text-yellow">Account activation in process...</p>
      )}

      { !isLoading && !activationSuccessful && (
        <div>
          <p className="absolute top-0 text-4xl font-accent tracking-wider font-medium text-yellow">
            Account Activation failed
          </p>
        </div>
      )}

      { !isLoading && activationSuccessful && (
        <div>
          <div className="relative flex justify-center items-start">
            <img src={images["knight_crouchwalk_gif"]} className="w-50 h-auto" />
            <p className="absolute top-0 text-4xl font-accent tracking-wider font-medium text-yellow">
              Account activated successfully!
            </p>
          </div>
          
          { needsProfileUpdate && (
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

          )}

        </div>
      )}
    </div>
    
  )
};

export default Activate;