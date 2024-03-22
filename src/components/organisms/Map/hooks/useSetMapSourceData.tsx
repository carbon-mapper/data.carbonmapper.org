import type { MapTypes } from '@/components/organisms/Map/Map.types';

export function setMapSourceData(map: mapboxgl.Map, id: string, sourceData: MapTypes.SourceData) {
    const source = map.getSource(id) as mapboxgl.GeoJSONSource;
    source?.setData(sourceData);
}
