import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateJob,
  useDeleteJob,
  useFetchJobById,
} from "../customHooks/useJob";
import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import AuthButton from "../components/AuthButton";

const JobEditPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const { data: job } = useFetchJobById(jobId);
  const [formData, setFormData] = useState({});

  const { mutate: update } = useUpdateJob();
  const { mutate: remove } = useDeleteJob();

  useEffect(() => {
    if (job) setFormData(job);
  }, [job]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdate = () =>
    update(
      { updatedJob: formData, email },
      { onSuccess: () => navigate("/profile/hr") }
    );

  const handleDelete = () =>
    remove({ jobId, email }, { onSuccess: () => navigate("/profile/hr") });

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

  if (!job) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-900 rounded-lg space-y-4">
      {fields.map(({ label, type, name, value }) => (
        <InputField
          key={name}
          label={label}
          type={type}
          name={name}
          value={value || ""}
          onChange={handleChange}
        />
      ))}

      <div className="flex gap-4 justify-end">
        <AuthButton label="Update" onClick={handleUpdate} />
        <AuthButton label="Delete" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default JobEditPage;
