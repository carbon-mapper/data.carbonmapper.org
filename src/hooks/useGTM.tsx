import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { debounce, debouncePromise } from '@/utils/debounce';

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

interface TrackEventOptions {
    debounce?: boolean;
}

export function trackEvent({ event, ...rest }: EventProps) {
    if (window.dataLayer === undefined) {
        console.warn('GTM not initialized');
        return;
    }

    isDev && console.log('trackEvent', event, rest);

    window.dataLayer.push({
        event,
        ...rest
    });
}

export const debouncedTrackEvent = debounce(trackEvent, 1000);
export const debouncedTrackEventPromise = debouncePromise(trackEvent, 1000);

export const newTrackEvent = (payload: EventProps, options?: TrackEventOptions) => {
    const { debounce } = options ?? {};

    if (debounce === true) debouncedTrackEvent(payload);
    else trackEvent(payload);
};
