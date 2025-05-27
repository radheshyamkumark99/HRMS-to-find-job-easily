import React from "react";
import { Navigate } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import PostJobForm from "../components/PostJobForm";
import { useFetchUser } from "../customHooks/useAuth";

const PostJobPage = () => {
  const email = localStorage.getItem("userEmail") || ""; 
  const { data: user, isLoading } = useFetchUser(email);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        Loading...
      </div>
    );
  }

  if (!user || user.role !== "HR") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <AuthCard
        title="Post a Job"
        footerText="Back to dashboard?"
        footerLink="/dashboard"
        footerLinkText="Dashboard"
      >
        <PostJobForm email={email} />
      </AuthCard>
    </div>
  );
};

export default PostJobPage;
