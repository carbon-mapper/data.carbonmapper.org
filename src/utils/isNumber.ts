
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any): boolean => typeof value === 'number' && !isNaN(value) && Number.isFinite(value);