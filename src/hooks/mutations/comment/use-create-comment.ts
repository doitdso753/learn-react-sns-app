import type { UseMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "@/api/comment.ts";

export default function useCreateComment(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      if (callback?.onSuccess) {
        callback.onSuccess();
      }
    },
    onError: error => {
      console.error(error);

      if (callback?.onError) {
        callback.onError(error);
      }
    }
  })
}