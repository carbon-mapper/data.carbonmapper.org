import { useAOI, useDrawMode, useDrawStoreActions } from '@/store/useDrawStore/useDrawStore';
import { useOverlay, usePanelActions } from '@/store/usePanelStore/usePanelStore';
import ButtonIcon from '@/components/atoms/ButtonIcon/ButtonIcon';
import ChooseAOI from '@/components/molecules/ChooseAOI/ChooseAOI';

export const AOIControls = () => {
    const overlay = useOverlay();
    const { setOverlay } = usePanelActions();
    const aoi = useAOI();
    const drawMode = useDrawMode();
    const { setDrawMode } = useDrawStoreActions();

    const isStaticMode = drawMode === 'static';

    return (
        <>
            <div style={{ display: 'flex', gap: '6px' }}>
                <ButtonIcon
                    icon='shape'
                    ariaLabel='Toggle draw or upload area of interest'
                    tooltip={{ text: 'Draw or Upload Area of Interest', position: 'right' }}
                    onClick={() => (overlay === 'choose-aoi' ? setOverlay(null) : setOverlay('choose-aoi'))}
                    options={{
                        active: overlay === 'choose-aoi',
                        opaque: true
                    }}
                />
                {aoi && (
                    <ButtonIcon
                        icon='edit'
                        ariaLabel='Edit area of interest'
                        tooltip={{ text: 'Edit Area of Interest', position: 'right' }}
                        onClick={() => setDrawMode(isStaticMode ? 'simple_select' : 'static')}
                        options={{
                            active: !isStaticMode,
                            opaque: true
                        }}
                    />
                )}
            </div>
            <ChooseAOI portalId='modals' isOpen={overlay === 'choose-aoi'} onClose={() => setOverlay(null)} />
        </>
    );
};
