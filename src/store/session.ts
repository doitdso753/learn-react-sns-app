import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import type { Session } from "@supabase/supabase-js";

type SessionState = {
  isLoaded: boolean;
  session: Session | null;
};

const initialState = {
  isLoaded: false,
  session: null,
} as SessionState;

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ isLoaded: true, session });
        },
      },
    })),
    {
      name: "sessionStore",
    },
  ),
);

export const useSession = () => {
  return useSessionStore((store) => store.session);
};

export const useIsSessionLoaded = () => {
  return useSessionStore((store) => store.isLoaded);
};

export const useSetSession = () => {
  return useSessionStore((store) => store.actions.setSession);
}