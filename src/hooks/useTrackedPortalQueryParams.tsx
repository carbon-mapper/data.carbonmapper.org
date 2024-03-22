import { useFilterStore } from '@/store/useFilterStore/useFilterStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { calculateSourceStatistics } from '@/components/organisms/Map/Map.utils';
import { debouncedTrackEvent } from './useGTM';
import { useSourcesInView } from './useSourceData';

export function useTrackedPortalQueryParams() {
    const [params, setParams] = usePortalQueryParams();
    const map = useMapSlice(state => state.map);
    const livesearchTerm = useFilterStore(state => state.livesearchTerm);
    const { data } = useSourcesInView();
    const { totalPlumes, totalSources } = calculateSourceStatistics(data?.features ?? []);

    const trackedSetParams: typeof setParams = (...args) => {
        setParams(...args);

        if (!map) return;

        const newParams = args[0];
        const zoom = map.getZoom();
        const { lat, lng } = map.getCenter();
        const bounds = map.getBounds();

        debouncedTrackEvent({
            event: 'search',
            event_name: 'search_submit',
            search_term: livesearchTerm,
            plumeCount: totalPlumes,
            sourceCount: totalSources,
            zoomLevel: zoom,
            geoMidPoint: `${lat}, ${lng}`,
            geoBoundingBox: bounds && bounds.toArray().join(', '),
            filters: { ...newParams }
        });
    };

    return [params, trackedSetParams] as const;
}
