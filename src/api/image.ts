import supabase from "@/lib/supabase.ts";
import { BUCKET_NAME } from "@/lib/constants.ts";

export async function uploadImage({ file, filePath }: { file: File, filePath: string }) {
  const { data, error } = await supabase
    .storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
}

export async function deleteImageInPath(path: string) {
  const { data: files, error: fetchFilesError } = await supabase
    .storage
    .from(BUCKET_NAME)
    .list(path);

  if (fetchFilesError) throw fetchFilesError;

  const paths = files.map((file) => `${path}/${file.name}`);
  const { error: removeError } = await supabase
    .storage
    .from(BUCKET_NAME)
    .remove(paths);

  if (removeError) throw removeError;
}