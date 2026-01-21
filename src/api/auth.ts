import supabase from "@/lib/supabase.ts";

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

  if (error) throw new Error(error.message);

  return data;
}