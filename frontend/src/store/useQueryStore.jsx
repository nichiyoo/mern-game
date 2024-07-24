import { create } from 'zustand';

const useQueryStore = create((set) => ({
	query: 'SELECT * FROM villages',
	setQuery: (query) => set({ query }),
	appendQuery: (query) => set((state) => ({ query: `${state.query} ${query}` })),
}));

export default useQueryStore;
