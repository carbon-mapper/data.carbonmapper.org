import type { PageContent } from '@/components/organisms/HowToUseIt/HowToUseIt.types';
import TableOfContentsItem from '../TableOfContentsItem/TableOfContentsItem';
import styles from './TableOfContents.module.scss';

const TableOfContents = ({
    content,
    activeItem,
    setActiveItem,
    resetSlider
}: {
    content: PageContent[];
    activeItem: number;
    setActiveItem: (index: number) => void;
    resetSlider: () => void;
}) => {
    return (
        <menu className={styles.menu}>
            {content.map((item, index) => (
                <TableOfContentsItem
                    key={item.title}
                    index={index}
                    title={item.title}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    resetSlider={resetSlider}
                />
            ))}
        </menu>
    );
};

export default TableOfContents;
