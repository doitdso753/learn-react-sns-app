import { createPortal } from "react-dom";
import PostEditorModal from "@/components/modal/post-editor-modal.tsx";
import AlertModal from "@/components/modal/alert-modal.tsx";
import ProfileEditorModal from "@/components/modal/profile-editor-modal.tsx";

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />
          <AlertModal />
          <ProfileEditorModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
};