import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
