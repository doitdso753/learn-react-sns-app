import { HeartIcon, MessageCircle } from "lucide-react";
import type { Post } from "@/types";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatTimeAgo } from "@/lib/time.ts";
import EditPostButton from "@/components/post/edit-post-button.tsx";
import { useSession } from "@/store/session.ts";

export default function PostItem(post: Post) {
  const session = useSession();
  const userId = session?.user?.id;

  const isMine = post.author_id === userId;

  return (
    <div className="flex flex-col gap-4 border-b pb-8">
      <div className="flex justify-between">
        {/* 유저 정보 */}
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar_url || defaultAvatar}
            alt={`${post.author.nickname}의 프로필 이미지`}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold hover:underline">
              {post.author.nickname}
            </div>
            <div className="text-muted-foreground text-sm">
              {formatTimeAgo(post.created_at)}
            </div>
          </div>
        </div>

        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              {/* 수정 버튼 */}
              <EditPostButton {...post} />
              {/* 삭제 버튼 */}
              <Button className="cursor-pointer" variant={"ghost"}>
                삭제
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex cursor-pointer flex-col gap-5">
        {/* 컨텐츠 */}
        <div className="line-clamp-2 wrap-break-word whitespace-pre-wrap">
          {post.content}
        </div>

        {/* 이미지 캐러셀 */}
        <Carousel>
          <CarouselContent>
            {post.image_urls?.map((url, index) => (
              <CarouselItem className={`basis-3/5`} key={index}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={url}
                    className="h-full max-h-87.5 w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex gap-2">
        {/* 좋아요 버튼 */}
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
          <HeartIcon className="h-4 w-4" />
          <span>0</span>
        </div>

        {/* 댓글 버튼 */}
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
          <MessageCircle className="h-4 w-4" />
          <span>댓글 달기</span>
        </div>
      </div>
    </div>
  );
}
