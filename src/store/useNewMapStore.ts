import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

type NewMapStore = {
    selectedPlumeId: string | undefined;
    actions: {
        // May want to "expand" this definition in the future
        setSelectedPlumeId: (selectedPlumeId: string | undefined) => void;
    };
};

const useNewMapStore = create<NewMapStore>()(set => ({
    selectedPlumeId: undefined,
    actions: {
        setSelectedPlumeId: selectedPlumeId => set({ selectedPlumeId })
    }
}));

export const useSelectedPlumeId = () => useNewMapStore(state => state.selectedPlumeId);
export const useNewMapStoreActions = () => useNewMapStore(state => state.actions);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('New Map Store', useNewMapStore);
}
