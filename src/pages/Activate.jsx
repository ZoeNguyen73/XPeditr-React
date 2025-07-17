import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LuLoaderCircle } from "react-icons/lu";

import { useAuthContext } from "../context/AuthProvider";
import { useErrorHandler } from "../context/ErrorHandlerProvider";

import axios from "../api/axios";
import useOneTimeEffect from "../hooks/useOneTimeEffect";
import storage from "../utils/Storage";

import MessageBox from "../components/MessageBox";

const Activate = () => {
  const params = useParams();
  const activateToken = params.activateToken;

  const { setAuth, setIsLoggedIn } = useAuthContext();
  const { handleError } = useErrorHandler();
  const navigate = useNavigate();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ isRedirecting, setIsRedirecting ] = useState(false);
  const [ activationSuccessful, setActivationSuccessful ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ showMessageBox, setShowMessageBox ] = useState(false);

  // activate account using the activateToken upon landing on the page
  // using useOneTimeEffect hook to ensure the activation is not done twice
  useOneTimeEffect(() => {
    console.log("useOneTimeEffect running...");
    console.log("🔍 Current URL:", window.location.href);
    const activate = async () => {
      console.log("activate running...");
      try {
        setIsLoading(true);
        const response = await axios.post(`auth/activate?token=${activateToken}`);
        const { user, accessToken, refreshToken } = response.data;
        const { username, avatar } = user;

        // Persist tokens and user info
        storage.setItem("username", username);
        storage.setItem("avatar", avatar);
        storage.setItem("accessToken", accessToken);
        storage.setItem("refreshToken", refreshToken);

        setAuth({ username: username, avatar: avatar, accessToken });
        setIsLoggedIn(true);
        setActivationSuccessful(true);
        setIsRedirecting(true);
        setTimeout(() => {
          navigate(`/profile-setup`);
        }, 500); 

      } catch (error) {

        const parsedError = await handleError(error);
        console.log("parsedError: " +  JSON.stringify(parsedError));
        if (parsedError && parsedError?.type !== "form") {
          setErrorMessage(`${parsedError.message}. ${parsedError.details}`);
          setShowMessageBox(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    activate(); // run the activation once
  }, []);

  return (
    <div>
      { isLoading && (
        <div className="flex flex-row gap-2">
          <LuLoaderCircle className="animate-spin h-4 w-4 mr-2" />
          <p className="text-4xl font-accent tracking-wider font-medium text-yellow">Account activation in process...</p>
        </div>
      )} 

      { !isLoading && !activationSuccessful && (
        <div>
          <p className="text-4xl font-accent tracking-wider font-medium text-yellow">
            Account Activation failed
          </p>
          { showMessageBox && errorMessage && (
            <MessageBox content={errorMessage} type="error"/>
          )}
        </div>
      )}

      { !isLoading && activationSuccessful && isRedirecting && (
        <div>
          <p className="text-4xl font-accent tracking-wider font-medium text-yellow">
            Account Activation successful!
          </p>
          <p className="text-text tracking-wide">Redirecting to profile setup...</p>
        </div>
      )}
    </div>
    
  )
};

export default Activate;