export namespace SourceDetailsHeaderInfoTypes {
    export type Props = {
        name: string | undefined;
        gas: Gas | undefined;
        sector: SectorCode | undefined;
    };

    export type Gas = 'CH4' | 'CO2';
    export type Gases = Gas[];
    export type SectorCode = '1B2' | '6A' | '6B' | '4B' | '1B1a' | '1A1' | 'other' | 'NA';
    export type SectorName =
        | 'Oil & Gas'
        | 'Solid Waste'
        | 'Waste Water'
        | 'Livestock'
        | 'Coal Mining'
        | 'Electricity'
        | 'Other'
        | 'Undetermined';

    export type SectorsBySectorCode = {
        [key in SectorCode]: SectorName;
    };
}
