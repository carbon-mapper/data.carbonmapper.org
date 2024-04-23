import classNames from 'classnames';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import styles from './TableOfContentsItem.module.scss';

const TableOfContentsItem = ({
    index,
    title,
    activeItem,
    setActiveItem,
    resetSlider
}: {
    index: number;
    title: string;
    activeItem: number;
    setActiveItem: (index: number) => void;
    resetSlider: () => void;
}) => {
    const onClickHandler = () => {
        setActiveItem(index);
        resetSlider();
    };

    return (
        <li
            className={classNames(styles.item, {
                [styles.active]: index === activeItem
            })}
        >
            <Button onClick={onClickHandler}>{title}</Button>
        </li>
    );
};

export default TableOfContentsItem;
