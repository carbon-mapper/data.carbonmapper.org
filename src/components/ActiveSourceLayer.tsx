import { Layer, Source } from 'react-map-gl';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { AnchorLayer } from './AnchorLayer';
import { CH4_ACTIVE_SOURCE_MARKER_ID, CO2_ACTIVE_SOURCE_MARKER_ID } from './activeSourceMarkers';
import { useSourceByNameData } from './organisms/Map/hooks/useSourceByNameData';

const ACTIVE_SOURCE_ANCHOR_ID = 'active-source-anchor-layer';

export const ActiveSourceLayer = () => {
    const [{ details: currentSourceId }] = usePortalQueryParams();
    const { data: selectedSourceData } = useSourceByNameData(currentSourceId ?? null);

    const PLUME_ORIGIN_LAYOUT: mapboxgl.SymbolLayout = {
        'icon-image':
            selectedSourceData?.source.gas === 'CO2' ? CO2_ACTIVE_SOURCE_MARKER_ID : CH4_ACTIVE_SOURCE_MARKER_ID,
        'icon-size': 1,
        'icon-allow-overlap': true
    };

    return (
        <>
            <AnchorLayer id={ACTIVE_SOURCE_ANCHOR_ID} />
            {selectedSourceData && (
                <Source type='geojson' data={selectedSourceData.point}>
                    <Layer type='symbol' layout={PLUME_ORIGIN_LAYOUT} beforeId={ACTIVE_SOURCE_ANCHOR_ID} />
                </Source>
            )}
        </>
    );
};
