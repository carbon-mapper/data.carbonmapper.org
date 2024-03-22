import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { useRightPanel, useOverlay, usePanelActions } from '@/store/usePanelStore/usePanelStore';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import ApiEndpointsModal from '@/components/organisms/ApiEndpoints/ApiEndpoints';
import FAQsModal from '@/components/organisms/FAQs/FAQs';
import HowToUseItModal from '@/components/organisms/HowToUseIt/HowToUseIt';
import ProductSpecSheetModal from '@/components/organisms/ProductSpecSheet/ProductSpecSheet';
import styles from './ButtonStack.module.scss';

// TODO: could abstract this to the animation file, but there's only one atm
const variants = {
    closed: {
        x: 50,
        opacity: 0
    },
    open: (index: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: index * -0.1, duration: 0.3 }
    }),
    close: (index: number) => ({
        x: 50,
        opacity: 0,
        transition: { delay: index * 0.1, duration: 0.2 }
    })
};

export const ButtonStack = () => {
    const overlay = useOverlay();
    const rightPanel = useRightPanel();
    const { setRightPanel, setOverlay } = usePanelActions();

    const isOpen = rightPanel === 'options';

    // TODO: could abstract this, but there's only one atm
    const items = [
        {
            title: 'How to use it',
            onClick: () => setOverlay('how-to-use-it')
        },
        {
            title: 'Product Guide',
            onClick: () => setOverlay('product-spec-sheet')
        },
        {
            title: 'API Endpoints',
            onClick: () => setOverlay('api-endpoints')
        },
        {
            title: 'FAQs',
            onClick: () => setOverlay('faqs')
        }
    ];

    const toggleMenu = () => setRightPanel(isOpen ? null : 'options');

    const onItemClick = (onClick?: () => void) => () => {
        setRightPanel(null);
        onClick?.();
    };

    return (
        <menu
            className={classNames(styles.container, {
                [styles['is-open']]: isOpen
            })}
        >
            <AnimatePresence>
                {isOpen && (
                    <ul className={styles.list}>
                        {items.map(({ title, onClick }, index) => (
                            <motion.li
                                key={title}
                                className={styles.item}
                                variants={variants}
                                custom={index}
                                initial='closed'
                                animate='open'
                                exit='close'
                            >
                                <ButtonBox stackChild transparent onClick={onItemClick(onClick)}>
                                    {title}
                                </ButtonBox>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </AnimatePresence>
            <ButtonBox small transparent icon='cog' onClick={toggleMenu} />
            <HowToUseItModal portalId='modals' isOpen={overlay === 'how-to-use-it'} onClose={() => setOverlay(null)} />
            <ProductSpecSheetModal
                portalId='modals'
                isOpen={overlay === 'product-spec-sheet'}
                onClose={() => setOverlay(null)}
            />
            <ApiEndpointsModal
                portalId='modals'
                isOpen={overlay === 'api-endpoints'}
                onClose={() => setOverlay(null)}
            />
            <FAQsModal portalId='modals' isOpen={overlay === 'faqs'} onClose={() => setOverlay(null)} />
        </menu>
    );
};
