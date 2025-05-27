

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signUpUser,
  signInUser,
  fetchUser,
  updateUser,
  deleteUser,
  refreshJwtToken,
} from "../services/authApi";

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {

      localStorage.setItem("userEmail", data.username);
      localStorage.setItem("accessToken", data.jwtToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.error("Sign-in error:", error);
    },
  });
};


export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      localStorage.setItem("userEmail", data.username);
      localStorage.setItem("accessToken", data.jwtToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      queryClient.setQueryData(["user", data.username], data);
    },
    onError: () => {
      queryClient.invalidateQueries(["user"])
    },
  });
};


export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refreshJwtToken,
    onSuccess: (data) => {
      queryClient.setQueryData(["data", data]);
    },
  });
};

export const useFetchUser = (email) =>
  useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUser(email),
    enabled: !!email,
    staleTime: Infinity,
    retry: 1,
  });
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onMutate: async (updatedUserData) => {
      const previousUserData = queryClient.getQueryData([
        "user",
        updatedUserData.email,
      ]);
      queryClient.setQueryData(["user", updatedUserData.email], {
        ...previousUserData,
        ...updatedUserData,
      });

      return { previousUserData };
    },
    onError: (err, updatedUserData, context) => {
      queryClient.setQueryData(
        ["user", updatedUserData.email],
        context.previousUserData
      );
    },
    onSettled: (updatedUserData) => {
      queryClient.invalidateQueries(["user", updatedUserData.email]);
    },
  });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: ()=>{
      queryClient.invalidateQueries(["user"])
    }
  });
};
