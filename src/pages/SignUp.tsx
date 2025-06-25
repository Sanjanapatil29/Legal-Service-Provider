
import React from "react";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
