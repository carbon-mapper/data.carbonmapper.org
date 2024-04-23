import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import type { Params } from '@/utils/usePortalQueryParams';
import type { MapRef } from 'react-map-gl';
import type { AOIMode } from '@/components/molecules/ChooseAOI/ChooseAOI';
import { useCurrentUser } from '@/hooks/useUser';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const isDev = process.env.NODE_ENV === 'development' || false;

/*
 * Hook to initialize Google Tag Manager
 * note: window interface extended in globals.d.ts
 */

export default function useGTM() {
    useEffect(() => {
        if (!GTM_ID) {
            console.warn('GTM_ID not found. Skipping GTM initialization.');
            return;
        }

        const tagManagerArgs = { gtmId: GTM_ID };
        TagManager.initialize(tagManagerArgs);
        window.dataLayer = window.dataLayer || [];
    }, []);
}

interface EventProps {
    event: string;
    [key: string]: any;
}

export function trackEvent({ event, ...rest }: EventProps) {
    if (window.dataLayer === undefined) return;

    isDev && console.log('trackEvent', event, rest);

    window.dataLayer.push({
        event,
        ...rest
    });
}

export function trackSearchSubmitEvent(
    trigger: string,
    filters: Partial<Params> & {
        aoi?: AOIMode | 'saved';
    }
) {
    trackEvent({
        event: 'search',
        event_name: 'search_submit',
        search_type: trigger,
        filters: formatFilters(filters)
    });
}

export function trackSearchImpressionEvent(
    totalPlumes: number,
    totalSources: number,
    map: MapRef,
    filters: Params & {
        aoi?: boolean;
    }
) {
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
        filters: formatFilters(filters)
    });
}

export function formatFilters(filters: Partial<Params> & { aoi?: boolean | string }) {
    const {
        date,
        emission_max,
        emission_min,
        gasType,
        instrument,
        location,
        persistence_max,
        persistence_min,
        plume_max,
        plume_min,
        plume_qualities,
        plume_status,
        sector,
        aoi
    } = filters;

    return {
        date_start: date?.date_start?.display,
        date_end: date?.date_end?.display,
        emission_max,
        emission_min,
        gasType,
        instrument: instrument?.join(','),
        location,
        persistence_max,
        persistence_min,
        plume_max,
        plume_min,
        plume_qualities: plume_qualities?.join(','),
        plume_status,
        sector: sector?.join(','),
        aoi: String(aoi)
    };
}

export function trackSourceSelectEvent(trigger: string, sourceName: string) {
    trackEvent({
        event: 'source',
        event_name: 'source_select',
        source_select_type: trigger,
        sourceName
    });
}

export function useUserTracking() {
    const currentUserQuery = useCurrentUser();
    const { data, isLoading } = currentUserQuery;

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!data) {
            trackEvent({
                event: 'account',
                event_name: 'user_status',
                user: {
                    logged_in: String(false)
                }
            });
            return;
        }

        const { industry, organization, title } = data;

        trackEvent({
            event: 'account',
            event_name: 'user_status',
            user: {
                logged_in: String(true),
                industry: industry,
                organization_name: organization,
                user_title: title
            }
        });
    }, [data, isLoading]);
}
