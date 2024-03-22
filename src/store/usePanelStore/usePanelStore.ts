import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

interface PanelStore {
    leftPanel: 'filters' | 'searches' | 'account' | 'bulk-download' | 'scene-list' | null;
    rightPanel: 'details' | 'statistics' | 'sources' | 'options' | null;
    isLayersPanelOpen: boolean;
    overlay:
        | 'sources'
        | 'save-search'
        | 'choose-aoi'
        | 'how-to-use-it'
        | 'product-spec-sheet'
        | 'acknowledgments'
        | 'attributions'
        | 'data-providers'
        | 'api-endpoints'
        | 'faqs'
        | null;
    sourceTrigger: 'map_click' | 'source_panel_click' | 'search_dropdown_click' | 'url_init';
    actions: {
        setLeftPanel: (panel: PanelStore['leftPanel']) => void;
        setRightPanel: (panel: PanelStore['rightPanel']) => void;
        setIsLayersPanelOpen: (isLayersPanelOpen: boolean) => void;
        setOverlay: (overlay: PanelStore['overlay']) => void;
        setSourceTrigger: (mode: PanelStore['sourceTrigger']) => void;
        hidePanels: () => void;
    };
}

const usePanelStore = create<PanelStore>((set, get) => ({
    leftPanel: null,
    rightPanel: 'sources',
    isLayersPanelOpen: false,
    overlay: null,
    sourceTrigger: 'url_init',
    actions: {
        setLeftPanel: leftPanel => set(() => ({ leftPanel })),
        setRightPanel: rightPanel => {
            const isLayersPanelOpen = get().isLayersPanelOpen;

            // Hide Layers Panel when Sources Panel opens
            // Layers Panel has an outside click handler
            if (rightPanel === 'sources' && isLayersPanelOpen) {
                set(() => ({ isLayersPanelOpen: false }));
            }
            set(() => ({ rightPanel }));
        },
        setIsLayersPanelOpen: isLayersPanelOpen => {
            const rightPanel = get().rightPanel;

            // Hide Sources Panel when Layers Panel opens
            if (rightPanel === 'sources' && isLayersPanelOpen) {
                set(() => ({ rightPanel: null }));
            }
            set(() => ({ isLayersPanelOpen }));
        },
        setOverlay: overlay => set(() => ({ overlay })),
        setSourceTrigger: sourceTrigger => set(() => ({ sourceTrigger })),
        hidePanels: () => set(() => ({ leftPanel: null, rightPanel: null, overlay: null }))
    }
}));

export const useLeftPanel = () => usePanelStore(state => state.leftPanel);
export const useRightPanel = () => usePanelStore(state => state.rightPanel);
export const useOverlay = () => usePanelStore(state => state.overlay);
export const useIsLayersPanelOpen = () => usePanelStore(state => state.isLayersPanelOpen);
export const useSourceTrigger = () => usePanelStore(state => state.sourceTrigger);
export const usePanelActions = () => usePanelStore(state => state.actions);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Panel Store', usePanelStore);
}
