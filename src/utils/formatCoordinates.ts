/*
Format coordinates from decimal to DMS (degrees, minutes, seconds) format.
Example: [longitude, latitude] => "0°0'0"N 0°0'0"E"
*/


export const formatCoordinates = (coords: [number, number]): string => {
    const convertToDMS = (coordinate: number, isLatitude: boolean): string => {
        const absoluteValue = Math.abs(coordinate);
        const degrees = Math.floor(absoluteValue);
        const minutesDecimal = (absoluteValue - degrees) * 60;
        const minutes = Math.floor(minutesDecimal);
        const seconds = ((minutesDecimal - minutes) * 60).toFixed(1);

        return `${degrees}°${minutes}'${seconds}"${
            isLatitude ? (coordinate >= 0 ? 'N' : 'S') : coordinate >= 0 ? 'E' : 'W'
        }`;
    };

    if (!Array.isArray(coords) || coords.length !== 2) {
        throw new Error('Coordinates should be provided as an array of two values [longitude, latitude].');
    }

    const [longitude, latitude] = coords;

    if (typeof longitude !== 'number' || typeof latitude !== 'number') {
        throw new Error('Invalid coordinate values. Longitude and latitude should be numbers.');
    }

    const formattedLatitude = convertToDMS(latitude, true);
    const formattedLongitude = convertToDMS(longitude, false);

    return `${formattedLatitude} ${formattedLongitude}`;
};

export function coordsToString(coordinates: number[][]): string {
    return coordinates.map(coord => coord.join(', ')).join('; ');
}