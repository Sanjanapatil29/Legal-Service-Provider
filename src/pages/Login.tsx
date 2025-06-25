
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
