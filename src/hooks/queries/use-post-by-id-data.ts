import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { fetchPostById } from "@/api/post.ts";

export function usePostByIdData ({
  postId,
  type
}: {
  postId: number,
  type: "FEED" | "DETAIL"
}) {
  console.log("usePostByIdData", postId, type);

  return useQuery({
    queryKey: QUERY_KEYS.post.byId(String(postId)),
    queryFn: () => fetchPostById(postId),
    enabled: type === "FEED",
  });
}