import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: ["localhost", "127.0.0.1"], // 허용할 호스트 지정
    host: "0.0.0.0", // 모든 IP 주소에서 접근 가능하도록 설정
    port: 5173, // 컨테이너 내부 포트
    strictPort: true, // 포트가 사용 중이면 에러 발생
    watch: {
      usePolling: true, // 파일 변경 감지를 위해 폴링 사용 (Docker 환경에서 필요)
      ignored: ["**/server/**"] // 파일 변경 시 리액트 리렌더링 방지하도록 설정
    },
  },
});