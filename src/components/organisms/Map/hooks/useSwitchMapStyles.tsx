import { useEffect } from 'react';
import { useMapLayersSlice } from '@/store/useMapLayersSlice/useMapLayersSlice';
import { useMapSlice } from '@/store/useMapSlice/useMapSlice';
import { mapstyles } from '../map.styles';

export const useSwitchMapStyles = () => {
    const activeBasemap = useMapLayersSlice(state => state.activeBasemap);
    const map = useMapSlice(state => state.map);

    useEffect(() => {
        map?.setStyle(mapstyles[activeBasemap]);
    }, [activeBasemap, map]);
};
