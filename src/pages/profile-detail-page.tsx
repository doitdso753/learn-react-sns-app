import { useEffect } from "react";
import { useParams, Navigate } from "react-router";
import ProfileInfo from "@/components/profile/profile-info.tsx";
import PostFeed from "@/components/post/post-feed.tsx";

export default function ProfileDetailPage() {
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    // 스크롤 최상단으로 이동
    window.scrollTo({ top: 0});
  }, []);

  if (!userId) return <Navigate to={"/"} replace />;

  return (
    <div className="flex flex-col gap-10">
      <ProfileInfo userId={userId} />
      <div className="border-b"></div>
      <PostFeed authorId={userId} />
    </div>
  );
}
