import { useMutation } from "@tanstack/react-query";
import { signInWithPassword } from "@/api/auth.ts";

export function useSignInWithPassword() {
  return useMutation({
    mutationFn: signInWithPassword,
  });
}