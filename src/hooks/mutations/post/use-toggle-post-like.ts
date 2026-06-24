import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePostLike } from "@/api/post.ts";
import type { Post, UseMutationCallback } from "@/types.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useTogglePostLike(callbacks: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,
    onMutate: async ({ postId }) => {
      // 조회 요청 취소
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(String(postId)),
      });

      const prevPost = queryClient.getQueryData<Post>(
        QUERY_KEYS.post.byId(String(postId)),
      );

      queryClient.setQueryData<Post>(
        QUERY_KEYS.post.byId(String(postId)),
        (post) => {
          if (!post) throw new Error("포스트가 존재하지 않습니다.");
          return {
            ...post,
            isLiked: !post.isLiked,
            like_count: post.isLiked
              ? post.like_count - 1
              : post.like_count + 1,
          };
        },
      );

      return {
        prevPost,
      }
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (error, context) => {
      console.error(error);

      if (context && context.prevPost) {
        queryClient.setQueryData(
          QUERY_KEYS.post.byId(context.prevPost.id),
          context.prevPost
        );
      }

      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}