import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ImageIcon, XIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/post-editor-modal.ts";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post.ts";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel.tsx";
import { useSession } from "@/store/session.ts";
import { useOpenAlertModal } from "@/store/alert-modal.ts";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post.ts";

type Image = {
  file: File;
  previewUrl: string;
}

export default function PostEditorModal() {
  const session = useSession();
  const postEditorModal = usePostEditorModal();
  const {
    isOpen,
    actions: { close },
  } = postEditorModal;
  const openAlertModal = useOpenAlertModal();
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      toast.error("포스트 생성에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      toast.error("포스트 수정에 실패했습니다.", {
        position: "top-center",
      });
    }
  });

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const contentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPending = isCreatePostPending || isUpdatePostPending;

  const handleCloseModal = () => {
    if (!postEditorModal.isOpen) return;
    if (postEditorModal.type === "CREATE" && content.trim() !== "" || images.length > 0) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다.",
        description: "이 화면에서 나가면 작성중이던 내용이 사라집니다.",
        onPositive: () => {
          close();
        },
      });

      return;
    }

    close();
  }

  const handleSavePostClick = () => {
    if (!postEditorModal.isOpen) return;
    if (content.trim() === "") return;

    if (postEditorModal.type === "CREATE") {
      createPost({
        content,
        images: images.map((image) => image.file),
        userId: session!.user.id,
      });
    } else {
      if (content === postEditorModal.content) return;
      updatePost({
        id: postEditorModal.postId,
        content,
      });
    }
    // setContent(""); <== useEffect isOpen에서 처리함
  }

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file: File) => {
        setImages((prev) => [...prev, { file, previewUrl: URL.createObjectURL(file) }]);
      });
    }

    e.target.value = "";
  }

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) => prevImages.filter((item) => item.previewUrl !== image.previewUrl));
    URL.revokeObjectURL(image.previewUrl);
  }

  useEffect(() => {
    if (contentTextAreaRef?.current) {
      contentTextAreaRef.current.style.height = "auto";
      contentTextAreaRef.current.style.height =
        contentTextAreaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) {
      images.map((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }

    if (postEditorModal.type === "CREATE") {
      setContent("");
      setImages([]);
    } else {
      setContent(postEditorModal?.content);
    }

    if (contentTextAreaRef?.current) {
      contentTextAreaRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          disabled={isPending}
          ref={contentTextAreaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-105 min-h-25 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
        />
        <input
          ref={fileInputRef}
          onChange={handleSelectImages}
          type="file"
          accept="image/*"
          className="hidden"
          multiple
        />
        {postEditorModal.isOpen &&
          postEditorModal.type === "CREATE" &&
          images.length > 0 && (
            <Carousel>
              <CarouselContent>
                {images.map((image) => (
                  <CarouselItem key={image.previewUrl} className="basis-2/5">
                    <div className="relative">
                      <img
                        src={image.previewUrl}
                        className="h-full w-full rounded-sm object-cover"
                      />
                      <div
                        onClick={() => handleDeleteImage(image)}
                        className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                      >
                        <XIcon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        {postEditorModal.isOpen && postEditorModal.type === "EDIT" && (
          <Carousel>
            <CarouselContent>
              {(postEditorModal.imageUrls ?? []).map((image) => (
                <CarouselItem key={image} className="basis-2/5">
                  <div className="relative">
                    <img
                      src={image}
                      className="h-full w-full rounded-sm object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {postEditorModal.isOpen && postEditorModal.type === "CREATE" && (
          <Button
            disabled={isPending}
            onClick={() => {
              fileInputRef.current?.click();
            }}
            variant="outline"
            className="cursor-pointer"
          >
            <ImageIcon className="h-5 w-5" />
            이미지 추가
          </Button>
        )}
        <Button
          disabled={isPending}
          onClick={handleSavePostClick}
          className="cursor-pointer"
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}