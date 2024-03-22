import SelectListItem from '@/components/atoms/SelectListItem/SelectListItem';
import styles from './FilterSelectList.module.scss';

interface Item<T> {
    name: T;
    displayName: string;
    checked: boolean;
    onClick: () => void;
}

interface ListProps<T> {
    items: Item<T>[];
    isAll: boolean;
    onAllItemClick: (isChecked: boolean) => void;
}

function FilterSelectList<T>({ items, isAll, onAllItemClick }: ListProps<T>) {
    return (
        <div className={styles.wrapper}>
            <SelectListItem name={'sectors-all'} label={'All'} checked={isAll} onClick={onAllItemClick} />
            {items.map(({ name, displayName, checked, onClick }) => (
                <SelectListItem
                    key={String(name)}
                    name={String(name)}
                    label={displayName}
                    checked={checked}
                    isAllChecked={isAll}
                    onClick={onClick}
                />
            ))}
        </div>
    );
}

export default FilterSelectList;
