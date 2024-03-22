import { create } from 'zustand';
import type { SourceDataTypes } from '@/types/api/source.types';

type VectorScene = SourceDataTypes.VectorScene;

interface CoverageStore {
    showScenes: boolean;
    currentScenes: VectorScene[] | [];
    actions: {
        setShowScenes: (visibility: boolean) => void;
        setCurrentScenes: (scenes: VectorScene[]) => void;
    };
}

const useCoverageStore = create<CoverageStore>(set => ({
    showScenes: false,
    currentScenes: [],
    actions: {
        setShowScenes: isShow => {
            set(() => ({ showScenes: isShow }));
            document.body.classList.toggle('is-coverage', isShow);
        },
        setCurrentScenes: scenes => set(() => ({ currentScenes: scenes }))
    }
}));

export const useShowScenes = () => useCoverageStore(state => state.showScenes);
export const useCurrentScenes = () => useCoverageStore(state => state.currentScenes);
export const useCoverageStoreActions = () => useCoverageStore(state => state.actions);
