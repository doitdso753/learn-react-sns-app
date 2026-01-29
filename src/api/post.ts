import supabase from "@/lib/supabase.ts";
import { uploadImage } from "@/api/image.ts";
import type { PostEntity } from "@/types.ts";

export async function fetchPosts({ from, to }: { from: number; to: number }) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*)")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return data;
}

export async function fetchPostById(postId: number) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*)")
    .eq("id", postId)
    .single();

  if (error) throw error;

  return data;
}

export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId }: {
  content: string;
  images: File[];
  userId: string
}) {
  // 새 포스트 생성
  const post = await createPost(content);

  if (images.length === 0) {
    return post;
  }

  try {
    // 생성한 포스트의 정보 기준으로 이미지 업로드
    const imageUrls = await Promise.all(
      images.map((image) => {
        const imageExtension = image.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${imageExtension}`;
        const filePath = `${userId}/${post.id}/${fileName}`;

        return uploadImage({
          file: image,
          filePath,
        });
      }),
    );

    // 포스트에 이미지 경로 업데이트
    return await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });
  } catch (e) {
    await deletePost(post.id);
    throw e;
  }
}

export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id!)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deletePost(postId: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", postId)
    .select()
    .single();

  if (error) throw error;

  return data;
}