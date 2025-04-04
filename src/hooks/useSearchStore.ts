import { create } from 'zustand';

interface ISearchStore {
  query: string;
  setQuery: (q: string) => void;
};

const useSearchStore = create<ISearchStore>((set) => ({
  query: '',
  setQuery: (q) => set({ query: q }),
}));

export default useSearchStore;
