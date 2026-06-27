import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/profile.ts";
import type { ProfileEntity, UseMutationCallback } from "@/types.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export const useUpdateProfile = (callback?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedProfile) => {
      if (callback?.onSuccess) {
        callback.onSuccess();
      }

      queryClient.setQueryData<ProfileEntity>(
        QUERY_KEYS.profile.byId(updatedProfile.id),
        updatedProfile
      );
    },
    onError: (error) => {
      console.error(error);

      if (callback?.onError) {
        callback.onError(error);
      }
    }
  });
};