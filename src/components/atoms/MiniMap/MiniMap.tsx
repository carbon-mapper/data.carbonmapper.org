import classNames from 'classnames';
import mapboxgl from 'mapbox-gl';
import { useRef, useEffect, useState, useCallback } from 'react';
import type { LngLatLike } from 'mapbox-gl';
import { debounce } from '@/utils/debounce';
import { useCountryData } from '@/utils/geocoding';
import { SECRETS } from '@/utils/secrets';
import { useInitializeMap } from '@/components/organisms/Map/hooks/useInitializeMap';
import type { MiniMapTypes } from './MiniMap.types';
import styles from './MiniMap.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const MiniMap = ({ coordinates, className }: MiniMapTypes.Props) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const mapWrapperRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);

    const { data: countryData } = useCountryData(coordinates);

    useInitializeMap({
        wrapperRef: mapWrapperRef,
        mapRef,
        style: SECRETS.MAPBOX_STYLES_MINIMAP_TOKEN,
        coordinates,
        interactive: false,
        renderWorldCopies: false
    });

    const addMarker = (map: mapboxgl.Map, coordinates: LngLatLike) => {
        if (markerRef.current) {
            markerRef.current.remove();
            markerRef.current = null;
        }

        const element = document.createElement('div');
        element.classList.add(styles.marker);

        const marker = new mapboxgl.Marker({
            draggable: false,
            element
        });

        marker.setLngLat(coordinates).addTo(map);

        markerRef.current = marker;
    };

    const onResize = () => mapRef.current?.resize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnResize = useCallback(() => debounce(onResize, 200), [mapRef.current]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || isLoaded || !coordinates) return;

        map.on('load', () => setIsLoaded(true));
    }, [mapRef, coordinates, isLoaded]);

    useEffect(() => {
        const map = mapRef.current;
        const wrapper = wrapperRef.current;

        if (!map || !countryData || !wrapper || !countryData.length || !isLoaded) return;

        const { short_code, bbox } = countryData[0];

        const iso = short_code.toUpperCase();

        if (map.getLayer('country-boundaries')) {
            map.fitBounds(bbox, { padding: 5, duration: 0 });

            map.setPaintProperty('country-boundaries', 'fill-color', [
                'match',
                ['get', 'iso_3166_1'],
                iso,
                '#AAAEB3',
                'rgba(0, 0, 0, 0)'
            ]);

            addMarker(map, coordinates);

            wrapper.classList.add('is-loaded');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countryData, mapRef, wrapperRef, isLoaded]);

    useEffect(() => {
        const map = mapRef.current;

        if (!isLoaded || !map) return;

        window.addEventListener('resize', debouncedOnResize);

        return () => {
            map.remove();
            mapRef.current = null;
            window.removeEventListener('resize', debouncedOnResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapRef, isLoaded]);

    return (
        <div className={classNames(styles.wrapper, className)} ref={wrapperRef}>
            <div className={styles.map} ref={mapWrapperRef}></div>
        </div>
    );
};

export default MiniMap;
