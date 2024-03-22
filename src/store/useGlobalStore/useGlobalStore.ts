import { create } from 'zustand';

type GlobalStore = {
    isPageLoaded: boolean;
    setIsPageLoaded: (loaded: boolean) => void;
    isAccessibility: boolean;
    setIsAccessibility: (isAccessibility: boolean) => void;
    isExperimentalSources: boolean;
    setIsExperimentalSources: (isExperimentalSources: boolean) => void;
};

const useGlobalStore = create<GlobalStore>(set => ({
    isPageLoaded: false,
    setIsPageLoaded: loaded => set(() => ({ isPageLoaded: loaded })),
    isAccessibility: false,
    setIsAccessibility: isAccessibility => set(() => ({ isAccessibility })),
    isExperimentalSources: false,
    setIsExperimentalSources: isExperimentalSources => set(() => ({ isExperimentalSources }))
}));

export const useIsPageLoaded = () => useGlobalStore(state => state.isPageLoaded);
export const useSetIsPageLoaded = () => useGlobalStore(state => state.setIsPageLoaded);
export const useIsAccessibility = () => useGlobalStore(state => state.isAccessibility);
export const useSetIsAccessibility = () => useGlobalStore(state => state.setIsAccessibility);
export const useIsExperimentalSources = () => useGlobalStore(state => state.isExperimentalSources);
export const useSetIsExperimentalSources = () => useGlobalStore(state => state.setIsExperimentalSources);
