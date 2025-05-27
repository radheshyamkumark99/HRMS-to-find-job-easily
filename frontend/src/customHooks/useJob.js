import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJob,
  fetchAllJobs,
  fetchJobsByEmail,
  fetchJobById,
  updateJob,
  deleteJob,
} from "../services/jobApi";

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
    },
  });
};

export const useFetchAllJobs = () =>
  useQuery({
    queryKey: ["jobs"],
    queryFn: fetchAllJobs,
  });

export const useFetchJobsByEmail = (email) =>
  useQuery({
    queryKey: ["jobs", email],
    queryFn: () => fetchJobsByEmail(email),
    enabled: !!email,
  });

export const useFetchJobById = (id) =>
  useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,
    onMutate: async (updatedJobData) => {
      const previousJobData = queryClient.getQueryData([
        "job",
        updatedJobData.id,
      ]);
      queryClient.setQueryData(["job", updatedJobData.id], {
        ...previousJobData,
        ...updatedJobData,
      });

      return { previousJobData };
    },
    onError: (err, updatedJobData, context) => {
      queryClient.setQueryData(
        ["job", updatedJobData.id],
        context.previousJobData
      );
    },
    onSettled: (updatedJobData) => {
      queryClient.invalidateQueries(["job", updatedJobData.id]);
      queryClient.invalidateQueries(["jobs"]);
    },
  });
};
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
    },
  });
};
