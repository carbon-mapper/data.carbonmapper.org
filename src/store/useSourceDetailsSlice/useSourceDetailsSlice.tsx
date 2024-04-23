import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import type { SourceDetailsSliceTypes } from './useSourceDetailsSlice.types';

export const useSourceDetailsSlice = createWithEqualityFn<SourceDetailsSliceTypes.Slice>()(
    devtools(
        set => ({
            /*
             * Active Tab
             */
            activeTab: 'observations',
            setActiveTab: tab => set(() => ({ activeTab: tab })),

            /*
             * User Closed
             */
            isUserClosed: false,
            setIsUserClosed: isUserClosed => set({ isUserClosed }),

            /*
             * Current Source
             */
            isCurrentSourcePHME: false,
            setIsCurrentSourcePHME: isPHME => set(() => ({ isCurrentSourcePHME: isPHME })),

            /*
             * Active Plume
             */
            activePlume: undefined,
            setActivePlume: plume => set(() => ({ activePlume: plume })),

            // Search Plume
            // Should get set when searching and then used to set activePlume
            searchedPlume: undefined,
            setSearchedPlume: searchedPlume => set(() => ({ searchedPlume })),

            /*
             * Hovered Plume
             */
            hoveredPlumeId: null,
            setHoveredPlumeId: id => set(() => ({ hoveredPlumeId: id })),

            /*
             * Include Null Detects
             */
            includeNullDetects: false,
            setIncludeNullDetects: includeNullDetects => set(() => ({ includeNullDetects }))
        }),
        { enabled: false, name: 'Source Details Slice' }
    ),
    shallow
);
