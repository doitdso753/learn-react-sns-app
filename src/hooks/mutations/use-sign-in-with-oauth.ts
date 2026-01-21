import { useMutation } from "@tanstack/react-query";
import { signInWithOAuth } from "@/api/auth.ts";
import type { UseMutationCallback } from "@/types.ts";

export function useSignInWithOAuth(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: error => {
      console.error(error);

      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    }
  });
}