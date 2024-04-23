import type { SourceDetailsTypes } from '@/components/organisms/SourceDetails/SourceDetails.types';
import { toFixed } from '@/utils/math.utils';
import { sectorMap } from '@/components/molecules/BarGraph/BarGraph.data';

export function getFormattedDateTime(date: Date) {
    const day = Intl.DateTimeFormat('en-UK', {
        timeZone: 'UTC',
        day: '2-digit'
    }).format(date);

    const month = Intl.DateTimeFormat('en-UK', {
        timeZone: 'UTC',
        month: 'short'
    }).format(date);

    const year = Intl.DateTimeFormat('en-UK', {
        timeZone: 'UTC',
        year: 'numeric'
    }).format(date);

    const time = Intl.DateTimeFormat('en-UK', {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }).format(date);

    return {
        day,
        month,
        year,
        time
    };
}

export const formatDisplayData = (data: SourceDetailsTypes.Plume) => {
    const {
        emission_auto,
        emission_uncertainty_auto,
        instrument,
        platform,
        phme_candidate,
        geometry_json,
        plume_id,
        scene_timestamp,
        published_at,
        sector
    } = data;
    const [longitude, latitude] = geometry_json.coordinates;
    const sectorName = sectorMap.find(({ code }) => code === sector)?.name || 'Undetermined';
    const dateTime = new Date(scene_timestamp);
    const { day, month, year, time } = getFormattedDateTime(dateTime);

    const {
        day: acquiredDay,
        month: acquiredMonth,
        year: acquiredYear,
        time: acquiredTime
    } = getFormattedDateTime(new Date(scene_timestamp));

    const {
        day: publishedDay,
        month: publishedMonth,
        year: publishedYear,
        time: publishedTime
    } = published_at === null
        ? { day: null, month: null, year: null, time: null }
        : getFormattedDateTime(new Date(published_at));

    return {
        day,
        month,
        year,
        time,
        acquiredDay,
        acquiredMonth,
        acquiredYear,
        acquiredTime,
        publishedDay,
        publishedMonth,
        publishedYear,
        publishedTime,
        emission: emission_auto,
        uncertainty: emission_uncertainty_auto,
        phme_candidate,
        plumeName: plume_id,
        latitude: toFixed(latitude, 5),
        longitude: toFixed(longitude, 5),
        instrument,
        platform,
        sector: sectorName
    };
};

export const formatNullDisplayData = (data: SourceDetailsTypes.Scene) => {
    const { timestamp } = data;

    // date-only forms are interpreted as a UTC time and date-time forms are interpreted as local time
    // Should the server be returning timestamps with timezone (UTC) specified already? maybe
    const timezoneSpecifiedTimestamp = timestamp.length === 19 ? `${timestamp}+00:00` : timestamp;

    const dateTime = new Date(timezoneSpecifiedTimestamp);
    const { day, month, year, time } = getFormattedDateTime(dateTime);

    return {
        day,
        month,
        year,
        time
    };
};
