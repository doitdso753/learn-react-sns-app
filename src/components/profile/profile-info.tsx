import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import { useSession } from "@/store/session.ts";
import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import EditProfileButton from "@/components/profile/edit-profile-button.tsx";
import defaultAvatar from "@/assets/default-avatar.jpg";

export default function ProfileInfo({ userId }: { userId: string }) {
  const session = useSession();

  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchingProfilePending
  } = useProfileData(userId);

  if (fetchProfileError) return <Fallback />
  if (isFetchingProfilePending) <Loader />

  const isMine = session?.user.id === userId;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        src={profile?.avatar_url || defaultAvatar}
        alt={`${profile?.nickname}의 프로필 이미지`}
        className="h-30 w-30 rounded-full object-cover"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile?.nickname}</div>
        <div className="text-muted-foreground">{profile?.bio}</div>
      </div>
      {isMine && <EditProfileButton />}
    </div>
  );
}