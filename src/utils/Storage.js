import { Cookies } from "react-cookie";

const cookies = new Cookies();

const storage = {

  setItem: (key, value) => {
    cookies.set(key, value, { path: "/", secure: true, sameSite: "strict" });
  },

  getItem: (key) => {
    return cookies.get(key) || null;
  },

  removeItem: (key) => {
    cookies.remove(key, { path: "/" });
  },

};

export default storage;