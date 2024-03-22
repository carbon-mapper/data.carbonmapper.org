import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import type { SummaryStatisticsSliceTypes } from './useSummaryStatisticsSlice.types';

// This isn't state - it's derived state, and derived state doesn't need to be kept as different state
// It can always just be calculated at render time
// If the computation is expensive, then we can memoize it
export const useSummaryStatisticsSlice = createWithEqualityFn<SummaryStatisticsSliceTypes.Slice>()(
    devtools(
        set => ({
            statistics: {
                totalEmissions: 0,
                totalUncertainty: 0,
                totalPlumes: 0,
                totalSources: 0,
                totalPersistentSources: 0,
                bySector: {
                    '1A1': 0,
                    '1B1a': 0,
                    '1B2': 0,
                    '4B': 0,
                    '6A': 0,
                    '6B': 0,
                    NA: 0,
                    other: 0
                }
            },
            setStatistics: statistics => set(() => ({ statistics }))
        }),
        { enabled: false, name: 'Summary Statistics Slice' }
    ),
    shallow
);
