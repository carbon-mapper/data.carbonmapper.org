import { FiltersTagItem } from '@/store/useFilterStore/useFilterStore';
import FilterTag from '@/components/atoms/FilterTag/FilterTag';
import styles from './SavedFilterTags.module.scss';

const SavedFilterTags = ({ tags }: { tags: FiltersTagItem[] }) => {
    return (
        <ul className={styles.tags}>
            {[...tags].map(({ name }) => (
                <li key={name}>
                    <FilterTag>{name}</FilterTag>
                </li>
            ))}
        </ul>
    );
};

export default SavedFilterTags;
