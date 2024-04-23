import { create } from 'zustand';

// Probably belongs in a global type store instead
export type EmissionConversion = 'kghr' | '20yrCO2kghr' | '100yrCO2kghr' | 'MCFday';

type GlobalStore = {
    isPageLoaded: boolean;
    setIsPageLoaded: (loaded: boolean) => void;
    isAccessibility: boolean;
    setIsAccessibility: (isAccessibility: boolean) => void;
    emissionConversionType: EmissionConversion;
    setEmissionConversionType: (t: EmissionConversion) => void;
};

const useGlobalStore = create<GlobalStore>(set => ({
    isPageLoaded: false,
    setIsPageLoaded: loaded => set(() => ({ isPageLoaded: loaded })),
    isAccessibility: false,
    setIsAccessibility: isAccessibility => set(() => ({ isAccessibility })),
    emissionConversionType: 'kghr',
    setEmissionConversionType: newType => set(() => ({ emissionConversionType: newType }))
}));

export const useIsPageLoaded = () => useGlobalStore(state => state.isPageLoaded);
export const useSetIsPageLoaded = () => useGlobalStore(state => state.setIsPageLoaded);
export const useIsAccessibility = () => useGlobalStore(state => state.isAccessibility);
export const useSetIsAccessibility = () => useGlobalStore(state => state.setIsAccessibility);
export const useEmissionConversionType = () => useGlobalStore(state => state.emissionConversionType);
export const useSetEmissionConversionType = () => useGlobalStore(state => state.setEmissionConversionType);
