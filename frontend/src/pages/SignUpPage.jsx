import React, { useState } from "react";

import AuthCard from "../components/AuthCard";
import AuthForm from "../components/AuthForm";
import { useSignUp } from "../customHooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const { mutate: signUpUser, isLoading } = useSignUp();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser(formData, {
      onSuccess: () => navigate("/",{state: {from: "signup"}}),
      onError: (err) => setErrors({ general: err.message || "Sign-up failed" }),
    });
  };

  const fields = [
    { label: "Full Name", type: "text", name: "name", value: formData.name },
    { label: "Email", type: "email", name: "email", value: formData.email },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: formData.password,
      isPassword: true,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <AuthCard
        title="Sign Up"
        footerText="Already have an account?"
        footerLink="/login"
        footerLinkText="Sign In"
      >
        <AuthForm
          fields={fields}
          onSubmit={handleSubmit}
          buttonLabel="Sign Up"
          isLoading={isLoading}
          errors={errors}
          handleChange={handleChange}
        />
        {errors.general && (
          <p className="text-red-500 text-center mt-2">{errors.general}</p>
        )}
      </AuthCard>
    </div>
  );
};

export default SignUpPage;
