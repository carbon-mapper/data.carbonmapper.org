import { useMemo } from 'react';
import { Layer, Source } from 'react-map-gl';
import { usePortalQueryParams } from '@/utils/usePortalQueryParams';
import { AnchorLayer } from './AnchorLayer';
import { useSourceByNameData } from './organisms/Map/hooks/useSourceByNameData';

const PLUME_ORIGIN_LAYOUT: mapboxgl.SymbolLayout = {
    'icon-image': 'activePlumeMarker',
    'icon-size': 1,
    'icon-allow-overlap': true
};
const ORIGIN_ANCHOR_ID = 'plume-origin-anchor-layer';

type ActivePlumeMarkerProps = {
    plumeUuid: string | undefined;
};
export const ActivePlumeMarker = ({ plumeUuid }: ActivePlumeMarkerProps) => {
    const [{ details: currentSourceId }] = usePortalQueryParams();
    const { data: selectedSourceData } = useSourceByNameData(currentSourceId ?? null);

    const plumePoint = useMemo(() => {
        if (selectedSourceData === undefined) return undefined;
        const plume = selectedSourceData.plumes.find(plume => plume.id === plumeUuid);
        if (plume === undefined) return undefined;

        return plume.geometry_json;
    }, [plumeUuid, selectedSourceData]);

    return (
        <>
            <AnchorLayer id={ORIGIN_ANCHOR_ID} />
            {/* Should only happen with selected plume - not the best code */}
            {plumePoint !== undefined && (
                <Source type='geojson' data={plumePoint}>
                    <Layer type='symbol' layout={PLUME_ORIGIN_LAYOUT} beforeId={ORIGIN_ANCHOR_ID} />
                </Source>
            )}
        </>
    );
};
