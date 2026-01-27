import RootRoute from "@/root-route.tsx";
import SessionProvider from "@/provider/session-provider.tsx";
import ModalProvider from "@/provider/modal-provider.tsx";

export default function App() {

  return (
    <SessionProvider>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </SessionProvider>
  );
}
