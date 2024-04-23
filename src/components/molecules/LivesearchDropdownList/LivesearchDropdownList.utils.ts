import { toFixed } from '@/utils/math.utils';

export interface ICoordinateDMS {
    degrees: number;
    minutes: number;
    seconds: number;
    direction: string;
}
export interface ICoordinatesDMS {
    latitude: ICoordinateDMS;
    longitude: ICoordinateDMS;
}

export interface ICoordinatesDecimal {
    latitude: number;
    longitude: number;
}

export const hasMoreLettersThanNumbers = (input: string): boolean =>
    input.replace(/[^a-zA-Z]/g, '').length > input.replace(/[^0-9]/g, '').length;

export function convertDMStoDecimal({ degrees, minutes, seconds, direction }: ICoordinateDMS): number {
    // Check the direction (North or East is positive, South or West is negative)
    const directionRegex = /^[NnEe]$/;

    // Calculate the decimal degrees
    const decimal = toFixed(degrees + minutes / 60 + seconds / 3600, 6);

    // Add the negative sign if it's South or West
    return directionRegex.test(direction) ? decimal : -1 * decimal;
}

function extractDMS(coordsString: string) {
    const regex =
        /([+-]?\d+(?:\.\d+)?)°?(\d+)?'?(\d+(?:\.\d+)?)?"?([NSEWnsew])?,?\s*([+-]?\d+(?:\.\d+)?)°?(\d+)?'?(\d+(?:\.\d+)?)?"?([NSEWnsew])?/;

    const matches = coordsString.match(regex);

    if (!matches) return null;

    const firstDMS = {
        degrees: parseFloat(matches[1]),
        minutes: matches[2] ? parseFloat(matches[2]) : 0,
        seconds: matches[3] ? parseFloat(matches[3]) : 0,
        direction: matches[4]
    };

    const secondDMS = {
        degrees: parseFloat(matches[5]),
        minutes: matches[6] ? parseFloat(matches[6]) : 0,
        seconds: matches[7] ? parseFloat(matches[7]) : 0,
        direction: matches[8]
    };

    const directionRegex = /^[NnSs]$/;

    return directionRegex.test(firstDMS.direction)
        ? {
              latitudeDMS: firstDMS,
              longitudeDMS: secondDMS
          }
        : {
              latitudeDMS: secondDMS,
              longitudeDMS: firstDMS
          };
}

export function normalizeCoordinates(input: string): ICoordinatesDecimal | null {
    const idDecimalRegex = /^([-+]?\d{1,2}(\.\d+)?),\s*([-+]?\d{1,3}(\.\d+)?)$/;

    const matchesDecimal = input.match(idDecimalRegex);

    if (matchesDecimal) {
        const [latitudeString, longitudeString] = input.split(',');

        const latitude = parseFloat(latitudeString);
        const longitude = parseFloat(longitudeString);

        return {
            latitude,
            longitude
        };
    }

    const dms = extractDMS(input);

    if (!dms) return null;

    const { latitudeDMS, longitudeDMS } = dms;

    const latitude = convertDMStoDecimal(latitudeDMS);
    const longitude = convertDMStoDecimal(longitudeDMS);

    return {
        latitude,
        longitude
    };
}
