import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useSession } from "@/store/session.ts";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { useProfileEditorModal } from "@/store/profile-editor-modal.ts";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

type Image = {
  file: File;
  previewUrl: string;
}

export default function ProfileEditorModal() {
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchingProfilePending
  } = useProfileData(session?.user.id);

  const store = useProfileEditorModal();
  const {
    isOpen,
    actions: { close }
  } = store;

  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      if (avatarImage) {
        URL.revokeObjectURL(avatarImage.previewUrl);
      }
      setAvatarImage(null);
      setNickname("");
      setBio("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage(null);
    }
  }, [profile, isOpen]);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    setAvatarImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle>프로필 수정하기</DialogTitle>
        {fetchProfileError && <Fallback />}
        {isFetchingProfilePending && <Loader />}
        {!fetchProfileError && !isFetchingProfilePending && (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">프로필 이미지</div>
              <input
                ref={fileInputRef}
                onChange={handleSelectImage}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <img
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
                src={avatarImage?.previewUrl || profile?.avatar_url || defaultAvatar}
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">닉네임</div>
              <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">소개</div>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            <Button className="cursor-pointer">수정하기</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}