import React, { useState } from "react";

import AuthForm from "./AuthForm";
import { useCreateJob } from "../customHooks/useJob";

const PostJobForm = ({ email }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eligibility: "",
    deadline: "",
  });
  const [errors, setErrors] = useState({});
  const { mutate: createJob, isLoading } = useCreateJob();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (!formData.deadline) {
      setErrors({ deadline: "Deadline is required." });
      return;
    }

    createJob(
      { ...formData, email},
      {
        onSuccess: () => {
          setFormData({
            title: "",
            description: "",
            eligibility: "",
            deadline: "",
          });
          setErrors({ success: "Job posted!" });
        },
        onError: (err) => {
          setErrors({ general: err.message || "Failed to post job." });
        },
      }
    );
  };

  const fields = [
    { label: "Job Title", type: "text", name: "title", value: formData.title },
    {
      label: "Description",
      type: "textarea",
      name: "description",
      value: formData.description,
    },
    {
      label: "Eligibility",
      type: "textarea",
      name: "eligibility",
      value: formData.eligibility,
    },
    {
      label: "Deadline",
      type: "datetime-local",
      name: "deadline",
      value: formData.deadline,
    },
  ];

  return (
    <div>
      <AuthForm
        fields={fields}
        onSubmit={handleSubmit}
        buttonLabel="Post Job"
        isLoading={isLoading}
        errors={errors}
        handleChange={handleChange}
      />
      {errors.success && (
        <p className="text-green-500 text-center mt-2">{errors.success}</p>
      )}
      {errors.general && (
        <p className="text-red-500 text-center mt-2">{errors.general}</p>
      )}
    </div>
  );
};

export default PostJobForm;
