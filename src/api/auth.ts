import supabase from "@/lib/supabase.ts";
import type { Provider } from "@supabase/auth-js/src/lib/types.ts";

export async function signUp({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signInWithPassword({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider });

  if (error) throw new Error(error.message);

  return data;
}