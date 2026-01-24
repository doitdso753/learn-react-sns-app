import logo from "@/assets/logo.png"

export default function GlobalLoader() {
  return (
    <div className="bg-muted flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-15 flex animate-bounce items-center gap-4">
        <img src={logo} className="w-10" alt="한입 로그의 로고" />
        <div className="text-2xl font-bold">한입 로그</div>
      </div>
    </div>
  );
}