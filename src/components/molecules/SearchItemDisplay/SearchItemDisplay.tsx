import * as turf from '@turf/turf';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import type { SavedSearch } from '@/hooks/useSavedSearches';
import { useDraw, useDrawStoreActions } from '@/store/useDrawStore/useDrawStore';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSetPopupMessage } from '@/store/usePopupMessageStore/usePopupMessageStore';
import { trackEvent, trackSearchSubmitEvent } from '@/hooks/useGTM';
import { useFitBounds } from '@/hooks/useMapMovements';
import { useSavedAOI } from '@/hooks/useSavedAOI';
import { useFilterTags } from '@/hooks/useTags';
import httpClient from '@/utils/httpClient';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import SaveForm from '../SaveForm/SaveForm';
import SavedFilterTags from '../SavedFilterTags/SavedFilterTags';
import styles from './SearchItemDisplay.module.scss';

const geometryToFeatureCollection = (geometry: Geometry): FeatureCollection<Geometry, GeoJsonProperties> => ({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry
        }
    ]
});

export type SearchItemDisplayProps = {
    search: SavedSearch;
    onMutate: () => void;
};
export const SearchItemDisplay = ({ search, onMutate }: SearchItemDisplayProps) => {
    const { id, name, query, created, aoi } = search;
    const dateDisplay = dayjs(created).format('MM/DD/YYYY');

    const draw = useDraw();
    const { setAOI, setDrawMode, deleteAOI } = useDrawStoreActions();
    // We don't need to fetch this until the user needs it
    // That is, until they click on the saved search
    const { data: aoiData } = useSavedAOI(aoi);

    const fitBounds = useFitBounds();
    const { setLeftPanel } = usePanelActions();
    const [, setParams] = usePortalQueryParams();
    const setMessage = useSetPopupMessage();

    const tags = useFilterTags({ params: query, hasAoi: aoiData !== undefined });

    const onClick = () => {
        // need to replace all currently set parameters
        // If we add query parameters we don't want to clear when selecting saved searches
        // We will need to update this code
        setParams(query, 'replace');

        setLeftPanel(null);

        if (aoiData && aoiData.geometry_json !== null && aoi) {
            const bounds = turf.bbox(aoiData.geometry_json).slice(0, 4) as [number, number, number, number];
            fitBounds(bounds, { padding: 100 });
            // Feel like we shouldn't need to do both...
            setAOI({
                geometry_json: aoiData.geometry_json,
                id: aoi
            });
            // Stupid type issue
            draw?.set(geometryToFeatureCollection(aoiData.geometry_json as Geometry));
            setDrawMode('static');
        } else {
            // Remove any existing aois
            deleteAOI();
        }

        trackSearchSubmitEvent('saved_search', {
            ...query,
            aoi: aoiData ? 'saved' : undefined
        });
    };

    // Expand as we support additional modifications
    const onEdit = async (newName: string) => {
        try {
            await httpClient.patch(`/account/search-request/${id}`, { name: newName });
            onMutate();
        } catch (error) {
            setMessage('Error updating search');
            console.error(error);
        }
    };

    const onDelete = async () => {
        try {
            await httpClient.delete(`/account/search-request/${id}`);
            onMutate();
            trackEvent({
                event: 'search',
                event_name: 'delete_saved_search'
            });
        } catch (error) {
            setMessage('Error deleting search');
            console.error(error);
        }
    };

    return (
        <SaveForm
            type='display'
            label=''
            options={{
                name,
                boxClassName: classNames('box', styles.box, styles.boxDisplay),
                bottomTagClassName: styles.bottomTag,
                bottomTag: `Created ${dateDisplay}`,
                deletePopup: {
                    title: 'Are you sure you want to delete this search?',
                    subtitle: `${name} (Created ${dateDisplay})`
                },
                callbacks: {
                    onClick,
                    onSubmit: onEdit,
                    onDelete
                }
            }}
        >
            <SavedFilterTags tags={tags} />
        </SaveForm>
    );
};
