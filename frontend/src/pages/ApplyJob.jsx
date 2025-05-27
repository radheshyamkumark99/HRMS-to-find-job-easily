import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import AuthForm from '../components/AuthForm';
import { useApplyForJob } from '../customHooks/useAppliedJob';
// import { uploadFileToS3 } from '../utils/UploadFile';

const ApplyJobFormPage = () => {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({
    applicantEmail: '',
    resume: null,
    contactDetails: '',
    githubUrl: '',
    linkedinUrl: '',
  });
  const [errors, setErrors] = useState({});
  const { mutate: apply, isLoading } = useApplyForJob();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      if (!formData.applicantEmail) throw new Error('Email is required.');
      if (!formData.resume) throw new Error('Please upload a resume.');
      // const resumeUrl = await uploadFileToS3(formData.resume);
      const resumeUrl = "https://reels-anshu.s3.eu-north-1.amazonaws.com/uploads/Keshav Maheshwari Resume.pdf1746422320265"

      localStorage.setItem(`application_${jobId}`, JSON.stringify({
        contactDetails: formData.contactDetails,
        githubUrl: formData.githubUrl,
        linkedinUrl: formData.linkedinUrl,
      }));
      apply(
        { applicantEmail: formData.applicantEmail, resumeUrl, jobId },
        {
          onSuccess: () => {
            setFormData({ applicantEmail: '', resume: null, contactDetails: '', githubUrl: '', linkedinUrl: '' });
            setErrors({ success: 'Application submitted!' });
          },
          onError: (error) => {
            const message = error?.response?.data;
            setErrors({ general: message });
          }
          
        }
      );
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  const fields = [
    { label: 'Email', type: 'email', name: 'applicantEmail', value: formData.applicantEmail },
    { label: 'Resume (PDF)', type: 'file', name: 'resume', value: '', accept: 'application/pdf' },
    { label: 'Contact Details (Phone)', type: 'tel', name: 'contactDetails', value: formData.contactDetails },
    { label: 'GitHub URL', type: 'url', name: 'githubUrl', value: formData.githubUrl },
    { label: 'LinkedIn URL', type: 'url', name: 'linkedinUrl', value: formData.linkedinUrl },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <AuthCard title="Apply for Job" >
        <AuthForm
          fields={fields}
          onSubmit={handleSubmit}
          buttonLabel="Submit Application"
          isLoading={isLoading}
          errors={errors}
          handleChange={handleChange}
        />
        {errors.success && <p className="text-green-500 text-center mt-2">{errors.success}</p>}
        {errors.general && <p className="text-red-500 text-center mt-2">{errors.general}</p>}
      </AuthCard>
    </div>
  );
};

export default ApplyJobFormPage;