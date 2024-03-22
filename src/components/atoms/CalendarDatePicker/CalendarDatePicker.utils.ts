
export const formatShortWeekday = (locale: string | undefined, date: Date) => {
    return new Date(date).toLocaleString(locale ?? 'en-US', { weekday: 'narrow' });
}