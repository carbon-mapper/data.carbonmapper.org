export namespace BarGraphTypes {
    export type BySector = {
        [key: string]: number;
    };

    export type Sector = {
        code: '1B2' | '6A' | '6B' | '4B' | '1B1a' | '1A1' | 'other' | 'NA';
        name:
            | 'Oil & Gas'
            | 'Solid Waste'
            | 'Waste Water'
            | 'Livestock'
            | 'Coal Mining'
            | 'Electricity'
            | 'Other'
            | 'Undetermined';
        colorClass: 'oil' | 'solid' | 'water' | 'livestock' | 'coal' | 'electricity' | 'other' | 'undetermined';
    };
}
