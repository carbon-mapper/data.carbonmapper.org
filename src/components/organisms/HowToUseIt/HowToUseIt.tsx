import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { PageContentWithSlides } from '@/components/organisms/HowToUseIt/HowToUseIt.types';
import Divider from '@/components/atoms/Divider/Divider';
import Modal from '@/components/atoms/Modal/Modal';
import withPortal from '@/hoc/withPortal';
import ContentText from './ContentText/ContentText';
import { content } from './HowToUseIt.content';
import { SliderCaption, SliderMedia } from './SliderContents/SliderContents';
import SliderControls from './SliderControls/SliderControls';
import TableOfContents from './TableOfContents/TableOfContents';
import styles from './HowToUseIt.module.scss';

const HowToUseIt = () => {
    const [activeItem, setActiveItem] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);

    const prevItem = () => setActiveItem(prevState => prevState - 1);
    const nextItem = () => setActiveItem(prevState => prevState + 1);

    const prevSlide = () => setActiveSlide(prevState => prevState - 1);
    const nextSlide = () => setActiveSlide(prevState => prevState + 1);

    const setFirstSlide = () => setActiveSlide(0);

    const onPrevClickHandler = () => {
        if (activeSlide === 0) {
            prevItem();
            setActiveSlide(0);
        } else {
            prevSlide();
        }
    };

    const onNextClickHandler = (slideCount: number) => {
        if (activeSlide === slideCount - 1) {
            nextItem();
            setActiveSlide(0);
        } else {
            nextSlide();
        }
    };

    return (
        <section className={styles.container}>
            <TableOfContents
                content={content}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                resetSlider={setFirstSlide}
            />

            <AnimatePresence>
                {content[activeItem]?.content.type === 'slider' && (
                    <SliderCaption
                        content={content as PageContentWithSlides[]}
                        activeItem={activeItem}
                        activeSlide={activeSlide}
                    />
                )}
            </AnimatePresence>

            {/* <AnimatePresence> */}
            {content[activeItem]?.content.type === 'slider' && (
                <SliderControls
                    content={content as PageContentWithSlides[]}
                    activeItem={activeItem}
                    activeSlide={activeSlide}
                    next={onNextClickHandler}
                    prev={onPrevClickHandler}
                />
            )}
            {/* </AnimatePresence> */}

            {content[activeItem]?.content.type === 'text' && <ContentText text={content[activeItem].content.text} />}

            <AnimatePresence>
                {content[activeItem].content.type === 'slider' && (
                    <SliderMedia
                        key={content[activeItem].title + activeSlide}
                        content={content as PageContentWithSlides[]}
                        activeItem={activeItem}
                        activeSlide={activeSlide}
                    />
                )}
            </AnimatePresence>
            <Divider orientation='vertical' isGridChild />
        </section>
    );
};

const HowToUseItModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <Modal portal='modals' title='How to use it' animation='popup' onClose={onClose} fullScreen isDarkBg>
            <HowToUseIt />
        </Modal>
    );
};

export default withPortal(HowToUseItModal);
