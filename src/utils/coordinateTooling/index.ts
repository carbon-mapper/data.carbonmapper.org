interface DecimalCoordinates {
    latitude: number;
    longitude: number;
}

interface DMSCoordinate {
    degrees: number;
    minutes: number;
    seconds: number;
    direction: string;
}

interface DMSCoordinates {
    latitude: DMSCoordinate;
    longitude: DMSCoordinate;
}
export const decimalCoordinatesRegex = /^((-?)(\d{1,3})([,.]\d+)?),?\s*((-?)(\d{1,3})([,.]\d+)?)$/i;
export const dmsCoordinatesRegex =
    /^((\d{1,2})°\s?(\d{1,2})'\s?(\d+(?:\.\d+)?)"\s?([NSEWnsew]))(?:\W+)?((\d{1,2})°\s?(\d{1,2})'\s?(\d+(?:\.\d+)?)"\s?([NSEWnsew]))$/i;

export const toAbsoluteNumber = (input: number): number => Math.abs(input);

export const toAbsoluteNumberFromString = (input: string): number => Math.abs(parseFloat(input));

export const toFixed = (num: number, digits: number): number => Number(num.toFixed(digits));

export function extractDecimalFromString(coordinatesString: string): DecimalCoordinates | null {
    /*
     * Notes:
     *  - if invalid latitude is provided (e.g. 91.123), it will be treated as longitude
     *  - if both coordinates' absolute values are greater than 90, they will be discarded
     */

    const matches = coordinatesString.match(decimalCoordinatesRegex);

    if (!matches) return null;

    const latitude = parseFloat(matches[1]);
    const longitude = parseFloat(matches[5]);

    if (Math.abs(longitude) > 90 && Math.abs(latitude) > 90) return null;

    return Math.abs(latitude) > 90
        ? {
              latitude: longitude,
              longitude: latitude
          }
        : {
              latitude,
              longitude
          };
}

export function extractDMSFromString(coordinatesString: string): DMSCoordinates | null {
    /*
     * Notes:
     *  - if invalid latitude is provided (e.g. 91.123), everything will be discarded
     *  - if both coordinates' are of the same type (e.g. 91° 123' 123" N 91° 123' 123" S), everything will be discarded
     */

    const matches = coordinatesString.match(dmsCoordinatesRegex);

    if (!matches) return null;

    const firstDMS = {
        degrees: Number(matches[2]),
        minutes: Number(matches[3]),
        seconds: Number(matches[4]),
        direction: matches[5]
    };

    const secondDMS = {
        degrees: Number(matches[7]),
        minutes: Number(matches[8]),
        seconds: Number(matches[9]),
        direction: matches[10]
    };

    const firstDirection = firstDMS.direction;
    const secondDirection = secondDMS.direction;

    const directionRegex = /^[NnSs]$/;

    // discard if both coordinates are of the same type
    if (
        (directionRegex.test(firstDirection) && directionRegex.test(secondDirection)) ||
        (!directionRegex.test(firstDirection) && !directionRegex.test(secondDirection)) ||
        (firstDMS.degrees > 90 && secondDMS.degrees > 90)
    ) {
        return null;
    }

    const latitude = directionRegex.test(firstDirection) ? firstDMS : secondDMS;
    const longitude = directionRegex.test(firstDirection) ? secondDMS : firstDMS;

    // discard if invalid latitude is provided
    if (latitude.degrees > 90) return null;

    return {
        latitude,
        longitude
    };
}

export function convertDecimalToDMS(coordinates: number, type: 'latitude' | 'longitude'): DMSCoordinate {
    const isNegative = coordinates < 0;
    const degrees = isNegative ? Math.ceil(coordinates) : Math.floor(coordinates);
    const minutes = isNegative ? Math.ceil((coordinates - degrees) * 60) : Math.floor((coordinates - degrees) * 60);
    const seconds = ((coordinates - degrees) * 3600) % 60;

    const direction = (isNegative: boolean) => {
        if (type === 'latitude') {
            return isNegative ? 'S' : 'N';
        }

        return isNegative ? 'E' : 'W';
    };

    return {
        degrees: Math.abs(degrees),
        minutes: Math.abs(minutes),
        seconds: Math.abs(seconds),
        direction: direction(isNegative)
    };
}

export function convertDMStoDecimal(coordinate: DMSCoordinate): number {
    const negativeDirectionRegex = /^[NnEe]$/;
    const { degrees, minutes, seconds, direction } = coordinate;
    const decimal = toFixed(degrees + minutes / 60 + seconds / 3600, 10);

    return negativeDirectionRegex.test(direction) ? decimal : -1 * decimal;
}

export function convertDecimalStringToDMS(input: string): DMSCoordinates | null {
    const matches = input.match(decimalCoordinatesRegex);

    if (!matches) return null;

    const latitude = convertDecimalToDMS(parseFloat(matches[1]), 'latitude');
    const longitude = convertDecimalToDMS(parseFloat(matches[5]), 'longitude');

    return {
        latitude,
        longitude
    };
}

export function convertDMSStringToDecimal(input: string): DecimalCoordinates | null {
    const latitude = extractDMSFromString(input)?.latitude;
    const longitude = extractDMSFromString(input)?.longitude;

    if (!latitude || !longitude) return null;

    const decimalLatitude = convertDMStoDecimal(latitude);
    const decimalLongitude = convertDMStoDecimal(longitude);

    return {
        latitude: decimalLatitude,
        longitude: decimalLongitude
    };
}

export function normalizeStringCoordinatesToDecimal(coordinates: string): DecimalCoordinates | null {
    const isDMS = dmsCoordinatesRegex.test(coordinates);
    return isDMS ? convertDMSStringToDecimal(coordinates) : extractDecimalFromString(coordinates);
}

export function normalizeStringCoordinatesToDMS(coordinates: string): DMSCoordinates | null {
    const isDMS = dmsCoordinatesRegex.test(coordinates);
    return isDMS ? extractDMSFromString(coordinates) : convertDecimalStringToDMS(coordinates);
}

export function normalizeStringCoordinates(
    coordinates: string,
    output: 'decimal' | 'dms' = 'decimal'
): DecimalCoordinates | DMSCoordinates | null {
    switch (output) {
        case 'decimal':
            return normalizeStringCoordinatesToDecimal(coordinates);
        case 'dms':
            return normalizeStringCoordinatesToDMS(coordinates);
    }
}
