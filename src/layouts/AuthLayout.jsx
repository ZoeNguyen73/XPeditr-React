import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-background min-h-screen w-screen flex items-center justify-center px-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;