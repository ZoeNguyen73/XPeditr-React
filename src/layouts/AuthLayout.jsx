const AuthLayout = ({ children }) => {
  return (
    <div className="bg-background h-screen w-screen flex items-center justify-center px-4">
      {children}
    </div>
  );
};

export default AuthLayout;