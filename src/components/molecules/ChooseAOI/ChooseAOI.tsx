import { ReactElement, useRef, useEffect } from 'react';
import { useIsLoggedIn, useAccountActions } from '@/store/useAccountStore/useAccountStore';
import { useDraw, useDrawStoreActions } from '@/store/useDrawStore/useDrawStore';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import Icon from '@/components/atoms/Icon/Icon';
import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import styles from './ChooseAOI.module.scss';

function ChooseAOI({ onClose }: { onClose: () => void }) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const isLoggedIn = useIsLoggedIn();
    const { setLeftPanel } = usePanelActions();
    const { setView: setAccountView, setMessage } = useAccountActions();

    const draw = useDraw();
    const { setFile, setDrawMode } = useDrawStoreActions();

    function onChoiceHandler(drawMode: 'circle' | 'rectangle' | 'polygon' | 'file') {
        if (!draw) return;

        switch (drawMode) {
            case 'circle':
                onClose();
                setDrawMode('draw_circle');
                break;
            case 'rectangle':
                onClose();
                setDrawMode('draw_rectangle');
                break;
            case 'polygon':
                onClose();
                setDrawMode('draw_polygon');
                break;
            case 'file':
                if (!isLoggedIn) {
                    setLeftPanel('account');
                    setAccountView('message');
                    setMessage({
                        title: 'Information',
                        lines: [
                            {
                                text: 'Please log in to use Area of Interest file upload.',
                                button: {
                                    label: 'Login',
                                    view: 'login'
                                }
                            },
                            {
                                text: '...or create an account first.',
                                button: {
                                    label: 'Register',
                                    view: 'register'
                                }
                            }
                        ]
                    });
                    return;
                }
                onClose();
                if (fileInputRef.current) {
                    fileInputRef.current.click();
                }

                break;
        }
    }

    useEffect(() => {
        const fileInput = fileInputRef.current;

        function handleFile(event: Event) {
            const fileInput = event.target as HTMLInputElement;
            const file = fileInput?.files?.[0];
            file && setFile(file);
            console.log('file');
        }

        fileInput?.addEventListener('change', event => handleFile(event));

        return () => {
            fileInput?.removeEventListener('change', event => handleFile(event));
        };
    }, [setFile]);

    return (
        <Modal size='xs' title='Draw or Upload Area of Interest' animation='scale' onClose={onClose} isDarkBg>
            <div className={styles.container}>
                <ul className={styles.list}>
                    <ShapeItem icon={<Icon icon='circle' />} text='Circle' onClick={() => onChoiceHandler('circle')} />
                    <ShapeItem
                        icon={<Icon icon='square' />}
                        text='Rectangle'
                        onClick={() => onChoiceHandler('rectangle')}
                    />
                    <ShapeItem
                        icon={<Icon icon='polygon' />}
                        text='Polygon'
                        onClick={() => onChoiceHandler('polygon')}
                    />
                    <ShapeItem
                        icon={<Icon icon='upload' />}
                        text='Upload file'
                        onClick={() => onChoiceHandler('file')}
                        fileInput
                        forwardedRef={fileInputRef}
                    />
                </ul>
            </div>
        </Modal>
    );
}

function ShapeItem({
    icon,
    text,
    onClick,
    fileInput = false,
    forwardedRef
}: {
    icon: ReactElement;
    text: string;
    onClick?: () => void;
    fileInput?: boolean;
    forwardedRef?: React.RefObject<HTMLInputElement>;
}) {
    return (
        <li className={styles.item}>
            <button onClick={onClick}>
                {icon}
                <p>{text}</p>
                {fileInput && <input type='file' accept='.geojson' ref={forwardedRef} />}
            </button>
        </li>
    );
}

export default withPortal(ChooseAOI);
