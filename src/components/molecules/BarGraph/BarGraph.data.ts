import type { BarGraphTypes } from '@/components/molecules/BarGraph/BarGraph.types';

export const sectorMap: BarGraphTypes.Sector[] = [
    { code: '1B2', name: 'Oil & Gas', colorClass: 'oil' },
    { code: '6A', name: 'Solid Waste', colorClass: 'solid' },
    { code: '6B', name: 'Waste Water', colorClass: 'water' },
    { code: '4B', name: 'Livestock', colorClass: 'livestock' },
    { code: '1B1a', name: 'Coal Mining', colorClass: 'coal' },
    { code: '1A1', name: 'Electricity', colorClass: 'electricity' },
    { code: 'other', name: 'Other', colorClass: 'other' },
    { code: 'NA', name: 'Undetermined', colorClass: 'undetermined' }
];
