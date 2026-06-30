import RootRoute from "@/root-route.tsx";
import SessionProvider from "@/provider/session-provider.tsx";
import ModalProvider from "@/provider/modal-provider.tsx";
import { useEffect } from "react";
import { useSetTheme } from "@/store/theme.ts";

export default function App() {
  const setTheme = useSetTheme();

  // 테마 설정
  useEffect(() => {
    const themeStore = localStorage.getItem("ThemeStore")
      ? JSON.parse(localStorage.getItem("ThemeStore") as string)
      : null;
    const currentTheme = themeStore?.state?.theme;

    if (currentTheme) {
      console.log(currentTheme);
      setTheme(currentTheme);
    }
  }, []);

  return (
    <SessionProvider>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </SessionProvider>
  );
}
