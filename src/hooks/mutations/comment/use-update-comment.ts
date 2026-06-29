import { useMutation } from "@tanstack/react-query";
import { updateComment } from "@/api/comment.ts";
import type { UseMutationCallback } from "@/types.ts";

export default function useUpdateComment(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: updateComment,
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