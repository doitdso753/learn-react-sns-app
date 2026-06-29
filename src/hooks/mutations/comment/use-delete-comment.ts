import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "@/api/comment.ts";
import type { UseMutationCallback } from "@/types.ts";

export default function useDeleteComment(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: deleteComment,
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
  });
}