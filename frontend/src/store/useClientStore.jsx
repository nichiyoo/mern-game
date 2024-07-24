import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useClientStore = create(
	persist(
		(set) => ({
			client: null,
			setClient: (client) => set({ client }),
		}),
		{ name: import.meta.env.VITE_CLIENT_KEY }
	)
);

export default useClientStore;
