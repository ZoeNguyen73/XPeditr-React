const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg bg-sidebar p-8 rounded-xl shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;