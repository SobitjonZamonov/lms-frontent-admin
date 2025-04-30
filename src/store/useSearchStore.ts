import { create } from "zustand";

interface IuseSearchStore {
  search: string | undefined;
  setSearch: ({ name }: { name: string }) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<IuseSearchStore>()((set) => ({
  search: undefined,
  setSearch: ({ name }: { name: string }) => {
    set({ search: name });
  },
  clearSearch: () => {
    set({ search: undefined });
  },
}));
