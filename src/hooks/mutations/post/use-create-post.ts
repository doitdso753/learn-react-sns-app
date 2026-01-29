import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostWithImages } from "@/api/post.ts";
import type { UseMutationCallback } from "@/types.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useCreatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess){
        callbacks.onSuccess();
      }

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: error => {
      console.error(error);

      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    }
  })
}