import React, { useState } from "react";

import AuthCard from "../components/AuthCard";
import AuthForm from "../components/AuthForm";
import { useSignIn } from "../customHooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { mutate: signInUser, isLoading } = useSignIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser(formData, {
      onSuccess: () => navigate("/", { state: { from: "login" } }),
      onError: (err) => {
        let message = "Invalid credentials";
        if (err?.response?.status === 404) {
          message = "No user found with this email. Please sign up.";
        } else if (err?.response?.status === 401) {
          message = "Incorrect password. Please try again.";
        }
        setErrors({ general: message });
      },
    });
  };

  const fields = [
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
        title="Login"
        footerText="Don't have an account?"
        footerLink="/signup"
        footerLinkText="Sign Up"
      >
        <AuthForm
          fields={fields}
          onSubmit={handleSubmit}
          buttonLabel="Sign In"
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

export default LoginPage;
