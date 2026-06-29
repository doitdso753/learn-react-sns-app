import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "@/api/comment.ts";
import type { Comment, UseMutationCallback } from "@/types.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export default function useUpdateComment(callback?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      if (callback?.onSuccess) {
        callback.onSuccess();
      }

      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(updatedComment.post_id),
        (comments) => {
          if (!comments) throw new Error("댓글이 캐시 데이터에 보관되어있지 않습니다.");

          return comments.map(comment => {
            if (comment.id === updatedComment.id) {
              return { ...comment, ...updatedComment };
            }

            return comment;
          });
        }
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