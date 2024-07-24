import { create } from 'zustand';

const useOutputStore = create((set) => ({
	outputs: [],
	appendOutputs: (output) => set((state) => ({ outputs: [...state.outputs, output] })),
}));

export default useOutputStore;
