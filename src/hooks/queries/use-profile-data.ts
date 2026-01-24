import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { createProfile, fetchProfile } from "@/api/profile.ts";
import type { PostgrestError } from "@supabase/supabase-js";
import { useSession } from "@/store/session.ts";

export function useProfileData(userId: string) {
  const session = useSession();
  const isMine = userId === session?.user.id;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        return await fetchProfile(userId!);
      } catch (error) {
        // 내 계정일 때만 프로필 자동 생성하도록 허용
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          return await createProfile(userId!);
        }

        throw error;
      }
    },
    enabled: !!userId,
  });
}