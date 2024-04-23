'use client';

import { CirclePaint, SymbolLayout } from 'mapbox-gl';
import { useMemo } from 'react';
import { Layer, Source } from 'react-map-gl';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useUnboundedSources } from '@/hooks/useSourceData';
import { CH4_PRIMARY_COLOR } from '@/utils/globals';
import { AnchorLayer } from './AnchorLayer';

const SOURCE_ANCHOR_ID = 'source-anchor-layer';
const CH4_SOURCE_MARKER_ICON = 'ch4SourceMarker';
const CO2_SOURCE_MARKER_ICON = 'co2SourceMarker';
// Setting max source clustering to zoom level 12
// "Clusters are re-evaluated at integer zoom levels so setting clusterMaxZoom
// to 14 means the clusters will be displayed until z15"
// https://docs.mapbox.com/style-spec/reference/sources/#geojson-clusterMaxZoom
const MAX_CLUSTER_ZOOM = 12 - 1;
const MIN_SINGLE_CLUSTER_ZOOM = 5; // Needs no alteration as a minimum zoom level

export const SourceLayer = () => {
    const { data: sources } = useUnboundedSources();
    const showClusters = useMapLayersSlice(state => state.showClusters);
    const activeBasemapKey = useMapLayersSlice(state => state.activeBasemap);

    const sourceClusterPaint: CirclePaint = useMemo(() => {
        if (activeBasemapKey === 'satellite')
            return {
                ...SOURCE_CLUSTER_BASE_PAINT,
                'circle-stroke-color': 'white',
                'circle-stroke-width': 8,
                'circle-stroke-opacity': 0.25
            };

        return SOURCE_CLUSTER_BASE_PAINT;
    }, [activeBasemapKey]);

    return (
        <>
            <AnchorLayer id={SOURCE_ANCHOR_ID} />
            {/* Should be able to achieve some of the below by dynamically setting "cluster"
            But that has not worked in my experience. Can try again at some point */}
            {!showClusters && sources !== undefined && (
                <Source id='not-clustered-sources' type='geojson' data={sources}>
                    <Layer
                        id='not-clustered-source-icons'
                        type='symbol'
                        layout={SOURCE_POINT_LAYOUT}
                        beforeId={SOURCE_ANCHOR_ID}
                    />
                </Source>
            )}
            {showClusters && sources !== undefined && (
                <Source
                    id='clustered-sources'
                    type='geojson'
                    data={sources}
                    clusterMaxZoom={MAX_CLUSTER_ZOOM}
                    clusterRadius={40}
                    cluster // This should be dynamic, but that hasn't been my experience
                >
                    {/* For Multi-Source Clusters - filter: ['has', 'point_count']*/}
                    <Layer
                        id='source-clusters-points-circles'
                        filter={SOURCE_CLUSTER_FILTER}
                        type='circle'
                        paint={sourceClusterPaint}
                        beforeId={SOURCE_ANCHOR_ID}
                    />
                    <Layer
                        id='source-clusters-points-labels'
                        filter={SOURCE_CLUSTER_FILTER}
                        type='symbol'
                        paint={SOURCE_CLUSTER_PAINT}
                        layout={SOURCE_CLUSTER_LAYOUT}
                        beforeId={SOURCE_ANCHOR_ID}
                    />
                    {/* For Single-Source Clusters */}
                    <Layer
                        // App seems to be okay with this being the same id as the non-clustered layer
                        // But be wary
                        id='not-clustered-source-icons'
                        filter={SOURCE_POINT_FILTER}
                        type='symbol'
                        layout={SOURCE_POINT_LAYOUT}
                        beforeId={SOURCE_ANCHOR_ID}
                        minzoom={MIN_SINGLE_CLUSTER_ZOOM}
                    />
                </Source>
            )}
        </>
    );
};

const SOURCE_CLUSTER_BASE_PAINT: CirclePaint = {
    'circle-color': CH4_PRIMARY_COLOR,
    'circle-radius': ['interpolate', ['linear'], ['get', 'point_count'], 1, 10, 1000, 23]
};

const SOURCE_CLUSTER_LAYOUT: mapboxgl.SymbolLayout = {
    'text-field': ['get', 'point_count'],
    'text-size': 10,
    'text-font': ['Arial Unicode MS Bold']
};
const SOURCE_CLUSTER_PAINT: mapboxgl.SymbolPaint = {
    'text-color': 'white'
};
const SOURCE_CLUSTER_FILTER = ['has', 'point_count'];
const SOURCE_POINT_FILTER = ['!', SOURCE_CLUSTER_FILTER];

const SOURCE_POINT_LAYOUT: SymbolLayout = {
    'icon-image': [
        'match',
        ['get', 'gas'],
        'CH4',
        CH4_SOURCE_MARKER_ICON,
        'CO2',
        CO2_SOURCE_MARKER_ICON,
        CH4_SOURCE_MARKER_ICON
    ],
    'icon-size': 1,
    'icon-allow-overlap': true
};
