import classNames from 'classnames';
import { motion } from 'framer-motion';
import type { PageContentWithSlides } from '@/components/organisms/HowToUseIt/HowToUseIt.types';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
import { getAnimationType } from '@/animations/framer';
import styles from './SliderControls.module.scss';

const SliderControls = ({
    content,
    activeItem,
    activeSlide,
    next,
    prev
}: {
    content: PageContentWithSlides[];
    activeItem: number;
    activeSlide: number;
    next: (itemCount: number) => void;
    prev: () => void;
}) => {
    const { slides } = content[activeItem].content;

    const animation = getAnimationType('opacity');

    return (
        <motion.div className={styles.controls} {...animation}>
            <ButtonBox
                outline
                className={styles.prev}
                onClick={prev}
                disabled={activeSlide === 0 && activeItem === 0}
                aria-label='Previous slide'
            >
                Prev
            </ButtonBox>

            <div className={styles.pagination}>
                {slides?.length &&
                    slides.map((_, index) => (
                        <span
                            key={index}
                            className={classNames(styles.dot, { [styles.active]: activeSlide === index })}
                        />
                    ))}
            </div>

            <ButtonBox
                outline
                className={styles.next}
                onClick={() => next(slides?.length ? slides.length : 2)}
                disabled={activeSlide === slides?.length - 1 && activeItem === content.length - 1}
                aria-label='Next slide'
            >
                Next
            </ButtonBox>
        </motion.div>
    );
};

export default SliderControls;
