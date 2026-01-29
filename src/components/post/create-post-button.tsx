import { CirclePlusIcon } from "lucide-react";
import { useOpenCreatePostEditorModal } from "@/store/post-editor-modal.ts";

export default function CreatePostButton() {
  const openCreatePostEditorModal = useOpenCreatePostEditorModal();
  return (
    <div
      onClick={openCreatePostEditorModal}
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div>나누고 싶은 이야기가 있나요?</div>
        <CirclePlusIcon className="w-5 h-5" />
      </div>
    </div>);
}