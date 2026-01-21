import { type Database } from "@/database.types.ts"

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type UseMutationCallback = {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}