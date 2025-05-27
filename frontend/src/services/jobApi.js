import axios from "axios";
import BASEURL from "../constants/BaseURL";


const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};


export const createJob = async (job) => {
  const token = getAuthToken();
  const email = localStorage.getItem("userEmail")
  if (!token) {
    console.error("Token is not available yet");
    return;
  }
  const response = await axios.post(`${BASEURL}/api/jobs`, job, {
    params: { email },
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};

export const fetchAllJobs = async () => {
  const token = getAuthToken();
  if(!token){
    return ;
  }
  const response = await axios.get(`${BASEURL}/api/jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchJobsByEmail = async (email) => {
  const token = getAuthToken();
  
  if(!token){
    return ;
  }
  const response = await axios.get(`${BASEURL}/api/jobs/my-jobs`, {
    params: { email },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchJobById = async (id) => {
  const token = getAuthToken();
  if(!token){
    return ;
  }
  const response = await axios.get(`${BASEURL}/api/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateJob = async ({updatedJob, email}) => {
  const { id, ...rest } = updatedJob;
  const token = getAuthToken();
  if(!token){
    return ;
  }
  const response = await axios.put(`${BASEURL}/api/jobs/${id}`, rest, {
    params: { email },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteJob = async ({jobId, email}) => {
  console.log(jobId)
  const token = getAuthToken();

  if(!token){
    return ;
  }
  const response = await axios.delete(`${BASEURL}/api/jobs/${jobId}`, {
    params: { email },
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};
