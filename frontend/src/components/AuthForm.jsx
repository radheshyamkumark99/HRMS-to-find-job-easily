import React from "react";
import InputField from "./InputField";
import AuthButton from "./AuthButton";

const AuthForm = ({
  fields,
  onSubmit,
  buttonLabel,
  isLoading,
  errors,
  handleChange,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {fields.map((field) => (
      <InputField
        key={field.name}
        label={field.label}
        type={field.type}
        name={field.name}
        value={field.value}
        onChange={handleChange}
        error={errors[field.name]}
        isPassword={field.isPassword}
      />
    ))}
    <AuthButton label={buttonLabel} isLoading={isLoading} type="submit" />
  </form>
);

export default AuthForm;
