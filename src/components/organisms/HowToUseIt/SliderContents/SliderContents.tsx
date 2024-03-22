import { motion } from 'framer-motion';
import Image from 'next/image';
import type {
    PageContentWithSlides,
    SlideWithImage,
    SlideWithVideo
} from '@/components/organisms/HowToUseIt/HowToUseIt.types';
import { getAnimationType } from '@/animations/framer';
import styles from './SliderContents.module.scss';

export const SliderCaption = ({
    content,
    activeItem,
    activeSlide
}: {
    content: PageContentWithSlides[];
    activeItem: number;
    activeSlide: number;
}) => {
    const { slides } = content[activeItem].content;
    const { text } = slides[activeSlide];

    const animation = getAnimationType('opacity');

    return (
        <motion.figcaption className={styles.caption} {...animation}>
            <span className={styles.index}>{activeSlide + 1}</span>
            {text?.map(item => (
                <p key={text[0].slice(0, 5)}>{item}</p>
            ))}
        </motion.figcaption>
    );
};

export const SliderImage = ({ src, alt }: { src: string; alt: string }) =>
    src ? <Image alt={alt} src={src} width={750} height={507} /> : null;

export const SliderVideo = ({ src }: { src: string }) => (src ? <video autoPlay loop muted src={src}></video> : null);

export const SliderMedia = ({
    content,
    activeItem,
    activeSlide
}: {
    content: PageContentWithSlides[];
    activeItem: number;
    activeSlide: number;
}) => {
    const { slides } = content[activeItem].content;

    const animation = getAnimationType('opacity');

    return (
        <motion.figure {...animation} className={styles.media}>
            {'image' in slides[activeSlide] && (
                <SliderImage
                    src={(slides[activeSlide] as SlideWithImage).image}
                    alt={slides[activeSlide].text?.[0] || 'missing alt'}
                />
            )}
            {'video' in slides[activeSlide] && <SliderVideo src={(slides[activeSlide] as SlideWithVideo).video} />}
        </motion.figure>
    );
};
