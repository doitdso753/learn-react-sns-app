import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/post.ts";
import type { UseMutationCallback } from "@/types.ts";
import { deleteImageInPath } from "@/api/image.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useDeletePost(callbacks: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }

      if ((deletedPost.image_urls ?? []).length > 0) {
        await deleteImageInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}