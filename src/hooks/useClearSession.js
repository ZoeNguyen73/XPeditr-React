import { useAuthContext} from "../context/AuthProvider";
import storage from "../utils/Storage";

export const useClearSession = () => {
  const { setAuth } = useAuthContext();

  const clearSession = () => {
    storage.removeItem("username");
    storage.removeItem("accessToken");
    storage.removeItem("refreshToken");
    storage.removeItem("avatar");

    setAuth({
      username: "",
      accessToken: "",
      avatar: "",
    });
  }

  return clearSession;
};