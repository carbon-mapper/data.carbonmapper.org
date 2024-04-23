export const toFixed = (num: number, digits: number): number => Number(num.toFixed(digits));
// preseves trailing zeros that get lost in type conversion
export const toFixedString = (num: number, digits: number): string => num.toFixed(digits);
export const toNearest = (num: number, nearest: number): number => Math.round(num / nearest) * nearest;
export const toNearestCeil = (num: number, nearest: number): number => Math.ceil(num / nearest) * nearest;
export const toNearestFloor = (num: number, nearest: number): number => Math.floor(num / nearest) * nearest;

export const compactNumber = (
    number: number,
    options?: {
        maximumFractionDigits?: number;
        minimumFractionDigits?: number;
    }
) => Intl.NumberFormat('en-US', { notation: 'compact', ...options }).format(number);

export const integerNumber = (number: number) => Intl.NumberFormat('en-US').format(toFixed(number, 0));

export const compactNumberWithDecimals = (number: number) =>
    compactNumber(number, { maximumFractionDigits: 1, minimumFractionDigits: 1 });

export const compactNumberScientific = (number: number) =>
    number < 1000 ? compactNumber(number) : compactNumberWithDecimals(number);

export function customCoupledNotation(count: number, uncertainty: number) {
    const orderOfMagnitude = Math.floor(Math.log10(count));

    switch (true) {
        case orderOfMagnitude >= 0 && orderOfMagnitude <= 2:
            return {
                count: `${toFixedString(count, 0)}`,
                uncertainty: `${toFixedString(uncertainty, 0)}`
            };
        case orderOfMagnitude >= 3 && orderOfMagnitude <= 5:
            return {
                count: `${toFixedString(count / 1e3, 1)}K`,
                uncertainty: `${toFixedString(uncertainty / 1e3, 1)}K`
            };
        case orderOfMagnitude >= 6 && orderOfMagnitude <= 8:
            return {
                count: `${toFixedString(count / 1e6, 1)}M`,
                uncertainty: `${toFixedString(uncertainty / 1e6, 1)}M`
            };
        case orderOfMagnitude >= 9 && orderOfMagnitude <= 11:
            return {
                count: `${toFixedString(count / 1e9, 1)}B`,
                uncertainty: `${toFixedString(uncertainty / 1e9, 1)}B`
            };
        case orderOfMagnitude >= 12:
            return {
                count: `${toFixedString(count / 1e12, 1)}T`,
                uncertainty: `${toFixedString(uncertainty / 1e12, 1)}T`
            };
        default:
            return {
                count: `${toFixedString(count, 0)}`,
                uncertainty: `${toFixedString(uncertainty, 0)}`
            };
    }
}

export function formatFilesize(bytes: number) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${toFixed(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
}
