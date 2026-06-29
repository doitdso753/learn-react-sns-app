import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/api/comment.ts";
import type { Comment, UseMutationCallback } from "@/types.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export default function useDeleteComment(callback?: UseMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (deletedComment) => {
      if (callback?.onSuccess) {
        callback.onSuccess();
      }

      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(deletedComment.post_id),
        (comments) => {
          if (!comments) throw new Error("댓글이 캐시 데이터에 보관되어있지 않습니다.");
          return comments?.filter((comment) => comment.id !== deletedComment.id);
        },
      );
    },
    onError: error => {
      console.error(error);

      if (callback?.onError) {
        callback.onError(error);
      }
    }
  });
}