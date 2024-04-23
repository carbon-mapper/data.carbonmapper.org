import { Map } from 'mapbox-gl';
import { CH4_PRIMARY_COLOR, CO2_PRIMARY_COLOR } from '@/utils/globals';

type StyleImageInterface = {
    width: number;
    height: number;
    data: Uint8ClampedArray | Uint8Array;
    onAdd?: () => void;
    render: () => boolean;
    context?: CanvasRenderingContext2D | null;
};

const size = 36; // px
const lineWidth = 3; // px
const duration = 5000; // ms - animation duration
const toRad = (d: number) => (Math.PI / 180) * d;
export const CH4_ACTIVE_SOURCE_MARKER_ID = 'ch4ActiveSourceMarker';
export const CO2_ACTIVE_SOURCE_MARKER_ID = 'co2ActiveSourceMarker';

export const addActiveSourceMarkers = (map: Map) => {
    const getActiveSourceMarker = (gas: 'ch4' | 'co2'): StyleImageInterface => {
        return {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),

            // When the layer is added to the map,
            // get the rendering context for the map canvas.
            onAdd: function () {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                this.context = canvas.getContext('2d', { willReadFrequently: true });
            },

            // Call once before every frame where the icon will be used.
            render: function () {
                const t = (performance.now() % duration) / duration;

                const context = this.context;
                if (!context) return true;

                // clear the context
                context.clearRect(0, 0, this.width, this.height);
                context.save();
                context.translate(this.width / 2, this.height / 2);
                context.rotate(t * Math.PI * 2);
                context.translate(-this.width / 2, -this.height / 2);

                const x = this.width / 2;
                const y = this.height / 2;
                const radius = this.width / 2 - lineWidth;

                context.lineWidth = lineWidth;
                context.beginPath();
                context.arc(x, y, radius, toRad(0), toRad(90));
                context.strokeStyle = 'white'; // Fix
                context.stroke();
                context.beginPath();
                context.arc(x, y, radius, toRad(90), toRad(180));
                context.strokeStyle = gas === 'ch4' ? CH4_PRIMARY_COLOR : CO2_PRIMARY_COLOR;
                context.stroke();
                context.beginPath();
                context.arc(x, y, radius, toRad(180), toRad(270));
                context.strokeStyle = 'white'; // Fix
                context.stroke();
                context.beginPath();
                context.arc(x, y, radius, toRad(270), toRad(360));
                context.strokeStyle = gas === 'ch4' ? CH4_PRIMARY_COLOR : CO2_PRIMARY_COLOR;
                context.stroke();

                context.restore();

                // Update this image's data with data from the canvas.
                this.data = context.getImageData(0, 0, this.width, this.height).data;

                // Continuously repaint the map, resulting
                // in the smooth animation of the dot.
                map.triggerRepaint();

                // Return `true` to let the map know that the image was updated.
                return true;
            }
        };
    };

    if (!map.hasImage(CH4_ACTIVE_SOURCE_MARKER_ID)) {
        map.addImage(CH4_ACTIVE_SOURCE_MARKER_ID, getActiveSourceMarker('ch4'));
    }
    if (!map.hasImage(CO2_ACTIVE_SOURCE_MARKER_ID)) {
        map.addImage(CO2_ACTIVE_SOURCE_MARKER_ID, getActiveSourceMarker('co2'));
    }
};
