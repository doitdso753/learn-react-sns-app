import { TriangleAlert } from "lucide-react";

export default function Fallback() {
  return (
    <div className="text-muted-foreground flex flex-col justify-center items-center gap-2">
      <TriangleAlert className="w-6 h-6" />
      <div>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>
    </div>
  )
}