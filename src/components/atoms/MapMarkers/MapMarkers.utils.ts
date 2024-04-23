import type { SourceDataTypes } from '@/types/api/source.types';

export const sortScenesTimeDescending = (scenes: SourceDataTypes.Scene[] | SourceDataTypes.VectorScene[] | []) => {
    return scenes.sort((a, b) => {
        const timeA = new Date(a.timestamp);
        const timeB = new Date(b.timestamp);
        return timeA < timeB ? 1 : -1;
    });
};
