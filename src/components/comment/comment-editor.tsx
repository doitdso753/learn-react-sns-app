import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CommentEditor() {
  const [content, setContent] = useState("");

  const handleSubmitClick = () => {
    if (content.trim() === "") return;

    // API 요청
  }

  return (
    <div className="flex flex-col gap-2">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="flex justify-end">
        <Button onClick={handleSubmitClick}>작성</Button>
      </div>
    </div>
  );
}
