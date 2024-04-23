import { SourceDataTypes } from '@/types/api/source.types';
import { EmissionConversion } from '@/store/useGlobalStore/useGlobalStore';

// For additional reference
// https://highwoodemissions.com/tools/how-much-gas-is-that/
const kgPerHrTo100yrCO2eGWP = (n: number) => n * 28;
const kgPerHrTo20yrCO2eGWP = (n: number) => n * 86;
// (((1 kg/hr CH4 / 0.678 kg/m^3) * 35.3147 ft^3/m^3) / 1000 ft/mft) * 24 hr/day
const ch4McfPerHrFactor = (((1 / 0.678) * 35.3147) / 1000) * 24; // ~1.25
const kgPerHrCH4ToMcfPerHr = (n: number) => n * ch4McfPerHrFactor;
const co2McfPerHrFactor = (((1 / 1.98) * 35.3147) / 1000) * 24; // ~0.428
const kgPerHrCO2ToMcfPerHr = (n: number) => n * co2McfPerHrFactor;

export const convertEmissions = (
    emissions: number,
    uncertainty: number,
    options: { conversionType: EmissionConversion; gas: SourceDataTypes.GasType }
): { emissions: number; uncertainty: number; units: string } => {
    const { conversionType, gas } = options;
    const isCH4 = gas === 'CH4';

    switch (conversionType) {
        case 'kghr':
            return {
                emissions,
                uncertainty,
                units: `kg ${gas}/hr`
            };
        case '100yrCO2kghr':
            return {
                emissions: isCH4 ? kgPerHrTo100yrCO2eGWP(emissions) : emissions,
                uncertainty: isCH4 ? kgPerHrTo100yrCO2eGWP(uncertainty) : uncertainty,
                units: 'kg/hr CO2e'
            };
        case '20yrCO2kghr':
            return {
                emissions: isCH4 ? kgPerHrTo20yrCO2eGWP(emissions) : emissions,
                uncertainty: isCH4 ? kgPerHrTo20yrCO2eGWP(uncertainty) : uncertainty,
                units: 'kg/hr CO2e'
            };
        case 'MCFday':
            return {
                emissions: isCH4 ? kgPerHrCH4ToMcfPerHr(emissions) : kgPerHrCO2ToMcfPerHr(emissions),
                uncertainty: isCH4 ? kgPerHrCH4ToMcfPerHr(uncertainty) : kgPerHrCO2ToMcfPerHr(uncertainty),
                units: `Mcf ${gas}/d`
            };
        default:
            throw Error(`Emission Conversion type ${conversionType} not implemented`);
    }
};

const EMISSION_CONVERSION_MAP: Record<EmissionConversion, string> = {
    kghr: 'kg/hr (CH4 or CO2)',
    '100yrCO2kghr': 'CO2e 100yr kg/hr',
    '20yrCO2kghr': 'CO2e 20yr kg/hr',
    MCFday: 'Mcf/d (CH4 or CO2)'
};
export const EMISSION_CONVERSION_OPTIONS = Object.entries(EMISSION_CONVERSION_MAP).map(([value, label]) => ({
    value,
    label
}));
