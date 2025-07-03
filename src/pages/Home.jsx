import { useNavigate } from "react-router-dom";

import Button from "../components/CustomButton/CustomButton";
import SiteHeader from "../components/SiteHeader/SiteHeader";

const Home = () => {
  const navigate = useNavigate();


  return (
    <div className="p-4">
      <SiteHeader />
      {/* 🚨 Crash Test Button (dev only) */}
      {import.meta.env.DEV && (
        <div className="p-4">
          <Button
            handlePress={() => setCrash(true)}
            title="Crash the app"
            icon="🚨"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold text-text mb-3">Welcome to XPeditr</h1>
      <Button 
        handlePress={() => navigate("/auth/register")}
        title="Register"
        size="lg"
      />
      <Button 
        handlePress={() => navigate("/auth/login")}
        title="Login"
        size="lg"
      />
    </div>
  );
};

export default Home;