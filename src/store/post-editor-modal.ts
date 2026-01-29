import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type CreateMode = {
  isOpen: true;
  type: "CREATE";
}

type EditMode = {
  isOpen: true;
  type: "EDIT";
  postId: number;
  content: string;
  imageUrls: string[] | null;
}

type OpenState = CreateMode | EditMode;

type CloseState = {
  isOpen: false;
}

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () => {
          set({ isOpen: true, type: "CREATE" });
        },
        openEdit: (params: Omit<EditMode, "isOpen" | "type">) => {
          set({ isOpen: true, type: "EDIT", ...params });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "PostEditorModalStore" },
  ),
);

export const usePostEditorModal = () => {
  const store = usePostEditorModalStore();
  return store as typeof store & State;
}

export const useOpenCreatePostEditorModal = () => {
  return usePostEditorModalStore((store) => store.actions.openCreate);
};

export const useOpenEditPostEditorModal = () => {
  return usePostEditorModalStore((store) => store.actions.openEdit);
}