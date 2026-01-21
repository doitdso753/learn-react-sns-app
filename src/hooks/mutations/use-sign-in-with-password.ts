import { useMutation } from "@tanstack/react-query";
import { signInWithPassword } from "@/api/auth.ts";
import type { UseMutationCallback } from "@/types.ts";

export function useSignInWithPassword(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) {
        callbacks?.onError(error);
      }
    },
  });
}