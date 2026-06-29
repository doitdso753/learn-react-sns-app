import PostItem from "@/components/post/post-item.tsx";
import { Navigate, useParams } from "react-router";
import CommentList from "@/components/comment/comment-list.tsx";
import CommentEditor from "@/components/comment/comment-editor.tsx";

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.postId;

  if (!postId) return <Navigate to={"/"} replace />;

  return (
    <div className="flex flex-col gap-5">
      <PostItem postId={Number(postId)} type={"DETAIL"} />
      <div className="text-xl font-bold">댓글</div>
      <CommentEditor type={"CREATE"} postId={Number(postId)} />
      <CommentList postId={Number(postId)} />
    </div>
  );
}
