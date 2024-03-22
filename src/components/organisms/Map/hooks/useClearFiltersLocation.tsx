import { LngLatBounds } from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { useTrackedPortalQueryParams } from '@/hooks/useTrackedPortalQueryParams';
import { useLocation } from '@/utils/geocoding';

// I don't think this does what it should anymore
export const useClearFiltersLocation = () => {
    const [{ location: locationName, coordinates }, setParams] = useTrackedPortalQueryParams();
    const { locationData: location } = useLocation(locationName ?? undefined);
    const map = useMapSlice(state => state.map);

    const cameraBoundsRef = useRef<LngLatBounds | null>(null);

    useEffect(() => {
        if (!map || !location) return;

        const saveLastCameraBounds = () => {
            cameraBoundsRef.current = map.getBounds();
        };

        map.once('moveend', () => saveLastCameraBounds());

        return () => {
            map.off('moveend', () => saveLastCameraBounds());
        };
    }, [map, location]);

    useEffect(() => {
        if (!coordinates || !map || !cameraBoundsRef.current) return;

        const lastCameraBounds = cameraBoundsRef.current;

        !lastCameraBounds?.contains(coordinates) && setParams({ location: undefined });
    }, [coordinates, map, setParams]);

    useEffect(() => {
        if (!location) {
            cameraBoundsRef.current = null;
        }
    }, [location]);
};
