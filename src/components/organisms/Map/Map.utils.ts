import mapboxgl from 'mapbox-gl';
import { MutableRefObject, RefObject } from 'react';
import type { CirclePaint, FillPaint, LinePaint, RasterPaint, SymbolPaint } from 'mapbox-gl';
import { toNearestCeil } from '@/utils/math.utils';
import type { Source, Layer } from './Map.layers';
import type { MapTypes } from './Map.types';

export const extractFeatureProperties = (properties: MapTypes.FeatureProperties) => ({ ...properties });

export const buildMarker = (
    feature: MapTypes.MapboxFeature | MapTypes.MapboxClusterFeature
): {
    coordinates: [lng: number, lat: number];
    id: number | string;
    element: HTMLDivElement;
    pointCount: number;
    plumeCount: number;
    sourceName: string;
} => {
    const {
        cluster_id,
        point_count,
        plume_count,
        source_name = 'N/A - cluster'
    }: {
        cluster_id: number;
        point_count?: number | undefined;
        plume_count?: number | undefined;
        source_name?: string;
    } = feature.properties;
    const { id, geometry } = feature;
    const { coordinates } = geometry;

    const markerElement = document.createElement('div');
    markerElement.className = point_count ? 'marker-container cluster' : 'marker-container';
    markerElement.dataset.clusterId = cluster_id.toString();

    return {
        coordinates,
        // id: !isCluster ? id : cluster_id,
        id: id,
        element: markerElement,
        pointCount: point_count || 0,
        plumeCount: plume_count || 0,
        sourceName: source_name
    };
};

export const registerMarker = ({
    coordinates,
    element,
    mapRef
}: {
    coordinates: [lng: number, lat: number];
    element: HTMLDivElement;
    mapRef: MutableRefObject<mapboxgl.Map | null>;
}) => {
    if (!mapRef.current) return;
    const registeredMarker = new mapboxgl.Marker({
        draggable: false,
        element
    })
        .setLngLat(coordinates)
        .addTo(mapRef.current);

    return registeredMarker;
};

export const removeStaleMarkersFromDOM = (
    wrapperRef: RefObject<HTMLDivElement> | null,
    renderedFeatures: (MapTypes.MapboxFeature | MapTypes.MapboxClusterFeature)[]
) => {
    if (!wrapperRef || !wrapperRef.current) return;

    ([...wrapperRef.current.querySelectorAll('.marker-container')] as HTMLDivElement[])
        .filter(element =>
            renderedFeatures.find(feature => {
                if (!element.dataset.clusterId) return false;
                return feature.properties.cluster_id !== parseInt(element.dataset.clusterId, 10);
            })
        )
        .forEach(element => {
            element.remove();
        });
};

export const unregisterStaleMarkers = (markerState: MapTypes.Marker[]) =>
    markerState.forEach(marker => marker.registeredMarker.remove());

export const calculateSourceStatistics = (features: MapTypes.SourceData['features']): MapTypes.SourceStatistics => {
    const sourceStatistics = features.reduce(
        (acc, current) => {
            const emission =
                current.properties && 'emission_auto' in current.properties
                    ? Math.round(current.properties.emission_auto || 0)
                    : 0;
            const uncertainty =
                current.properties && 'emission_uncertainty_auto' in current.properties
                    ? Math.round(current.properties.emission_uncertainty_auto || 0)
                    : 0;
            const plumeCount =
                current.properties && 'plume_count' in current.properties ? current.properties.plume_count : 0;
            const persistentSource = plumeCount > 1;
            const sector = current.properties && 'sector' in current.properties ? current.properties.sector : '';
            // @ts-ignore
            const newSectorEmission = sector ? acc.bySector[sector] + emission : null;

            return {
                totalEmissions: acc.totalEmissions + emission,
                totalUncertainty: acc.totalUncertainty + uncertainty,
                totalPlumes: acc.totalPlumes + plumeCount,
                totalSources: acc.totalSources + 1,
                totalPersistentSources: persistentSource ? acc.totalPersistentSources + 1 : acc.totalPersistentSources,
                bySector: sector ? { ...acc.bySector, [sector]: newSectorEmission } : acc.bySector
            };
        },
        {
            totalEmissions: 0,
            totalUncertainty: 0,
            totalPlumes: 0,
            totalSources: 0,
            totalPersistentSources: 0,
            bySector: {
                '1A1': 0,
                '1B1a': 0,
                '1B2': 0,
                '4B': 0,
                '6A': 0,
                '6B': 0,
                NA: 0,
                other: 0
            }
        }
    );

    return sourceStatistics;
};

export const gatherFilterRanges = (features: MapTypes.MapboxFeature[], gas: 'CH4' | 'CO2') => {
    const filteredSources = features.filter(({ properties }) => properties.gas === gas);
    const emissions = filteredSources.map(
        ({ properties }) => ('emission_auto' in properties && properties.emission_auto) || 0
    );
    const plumes = filteredSources.map(
        ({ properties }) => ('plume_count' in properties && properties.plume_count) || 0
    );
    const maxEmissions = Math.max(...emissions, 0);
    const maxPlumes = Math.max(...plumes, 0);
    const maxEmissionsRounded = maxEmissions > 0 ? toNearestCeil(maxEmissions, 100) : 0;
    const maxPlumesRounded = maxPlumes > 0 ? toNearestCeil(maxPlumes, 5) : 0;

    return {
        maxEmissions: maxEmissionsRounded,
        maxPlumes: maxPlumesRounded
    };
};

export const addSource = (source: Source, map: mapboxgl.Map) => {
    if (map.getSource(source.id)) return;

    const { id, options, type, url, tileSize } = source;

    switch (type) {
        case 'geojson': {
            map.addSource(id, {
                type: type,
                data: { type: 'FeatureCollection', features: [] },
                ...options,
                generateId: true
            });
            break;
        }
        case 'vector': {
            map.addSource(id, {
                type: type,
                tiles: [url],
                promoteId: source.promoteId,
                ...options
            });
            break;
        }
        case 'raster': {
            map.addSource(id, {
                type: type,
                tiles: [url],
                tileSize,
                ...options
            });
            break;
        }
        default: {
            throw new Error('Unexpected source type');
            break;
        }
    }
};

export const addLayer = (layer: Layer, map: mapboxgl.Map) => {
    if (map.getLayer(layer.id)) return;

    // const { id, type, source, sourceLayer, paint, layout, filter } = layer;
    const { id, type, source, paint, layout, minZoom = 0, maxZoom = 24 } = layer;

    switch (type) {
        case 'line': {
            const sourceLayer = layer['source-layer'];

            map.addLayer({
                id: id,
                type: type,
                source: source,
                'source-layer': sourceLayer,
                paint: { ...(paint as LinePaint) },
                layout: { ...layout },
                minzoom: minZoom,
                maxzoom: maxZoom
            });
            break;
        }
        case 'circle': {
            map.addLayer({
                id: id,
                type: type,
                source: source,
                paint: paint as CirclePaint,
                layout: { ...layout },
                minzoom: minZoom,
                maxzoom: maxZoom
            });
            break;
        }
        case 'fill': {
            const sourceLayer = layer['source-layer'];

            map.addLayer({
                id: id,
                type: type,
                source: source,
                'source-layer': sourceLayer,
                paint: { ...(paint as FillPaint) },
                layout: { ...layout },
                minzoom: minZoom,
                maxzoom: maxZoom
            });
            break;
        }
        case 'raster': {
            map.addLayer({
                id: id,
                type: type,
                source: source,
                paint: { ...(paint as RasterPaint) },
                layout: { ...layout },
                minzoom: minZoom,
                maxzoom: maxZoom
            });
            break;
        }
        case 'symbol': {
            map.addLayer({
                id: id,
                type: type,
                source: source,
                paint: { ...(paint as SymbolPaint) },
                layout: { ...layout },
                minzoom: minZoom,
                maxzoom: maxZoom
            });
            break;
        }
        default: {
            throw new Error('Unexpected layer type');
            break;
        }
    }
};

export const addSources = (sources: { [key: string]: Source }, map: mapboxgl.Map) => {
    Object.values(sources).forEach(source => addSource(source, map));
};
export const addLayers = (layers: { [key: string]: Layer }, map: mapboxgl.Map) => {
    Object.values(layers).forEach(layer => addLayer(layer, map));
};

export const removeMapLayerAndSource = (map: mapboxgl.Map, layerId: string, sourceId: string) => {
    if (!map.getSource(sourceId)) return;

    map.removeLayer(layerId);
    map.removeSource(sourceId);
};

export const removeAllMapRasterLayersAndSources = (map: mapboxgl.Map) => {
    if (!map) return;

    const rasterLayers = map.getStyle().layers.filter(({ id }) => id.search(/plume/) > -1);
    rasterLayers.forEach(({ id }) => map.removeLayer(id));

    const rasterSources = Object.keys(map.getStyle().sources).filter(source => source.search(/plume/) > -1);
    rasterSources.forEach(source => map.removeSource(source));
};

export function lon2tile(lon: number, zoom: number): number {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}
export function lat2tile(lat: number, zoom: number): number {
    return Math.floor(
        ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
            Math.pow(2, zoom)
    );
}
