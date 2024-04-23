import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import type { SavedSearch } from '@/hooks/useSavedSearches';

type AlertItem = SavedSearch & {
    alert: boolean;
};

interface AlertStore {
    paused: boolean;
    items: AlertItem[] | [];
    actions: {
        togglePaused: (paused: boolean) => void;
        add: (item: SavedSearch) => void;
        remove: (id: string) => void;
        toggle: (id: string) => void;
        setAll: (items: SavedSearch[]) => void;
    };
}

const useAlertStore = create<AlertStore>((set, get) => ({
    paused: false,
    items: [],
    actions: {
        togglePaused: (paused: boolean) => {
            set({ paused });
        },
        add: (item: SavedSearch) => {
            const { items } = get();
            const newItem = { ...item, alert: false };
            set({ items: [...items, newItem] });
        },
        remove: (id: string) => {
            const { items } = get();
            const newItems = items.filter(item => item.id !== id);
            set({ items: newItems });
        },
        toggle: (id: string) => {
            const { items } = get();
            const newItems = items.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        alert: !item.alert
                    };
                }
                return item;
            });
            set({ items: newItems });
        },
        setAll: (items: SavedSearch[]) => {
            const newItems = items.map(item => ({ ...item, alert: false }));
            set({ items: newItems });
            console.log('searches added to alert store');
        }
    }
}));

export const useAlertActions = () => useAlertStore(state => state.actions);
export const useAlertItems = () => useAlertStore(state => state.items);
export const useAlertsPaused = () => useAlertStore(state => state.paused);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Alert Store', useAlertStore);
}
