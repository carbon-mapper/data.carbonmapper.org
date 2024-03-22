import { useEffect } from 'react';
import { useIsPageLoaded } from '@/store/useGlobalStore/useGlobalStore';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { trackEvent } from '@/hooks/useGTM';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { calculateSourceStatistics } from '@/components/organisms/Map/Map.utils';
import { useSourcesInView } from './useSourceData';

export function useInitialTrackingImpression() {
    const isPageLoaded = useIsPageLoaded();
    const [params] = usePortalQueryParams();
    const map = useMapSlice(state => state.map);
    const { data } = useSourcesInView();
    const { totalPlumes, totalSources } = calculateSourceStatistics(data?.features ?? []);

    useEffect(() => {
        if (!map || !isPageLoaded) return;

        const zoom = map.getZoom();
        const { lat, lng } = map.getCenter();
        const bounds = map.getBounds();

        trackEvent({
            event: 'search',
            event_name: 'search_impression',
            plumeCount: totalPlumes,
            sourceCount: totalSources,
            zoomLevel: zoom,
            geoMidPoint: `${lat}, ${lng}`,
            geoBoundingBox: bounds && bounds.toArray().join(', '),
            filters: { ...params }
        });

        // Only on mount once the page is loaded
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPageLoaded]);
}
