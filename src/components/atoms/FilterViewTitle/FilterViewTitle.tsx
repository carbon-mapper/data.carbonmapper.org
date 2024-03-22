import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import Icon from '../Icon/Icon';
import styles from './FilterViewTitle.module.scss';

const FilterViewTitle = ({
    title,
    onBackClick,
    onClearClick
}: {
    title: string;
    onBackClick: () => void;
    onClearClick?: () => void;
}) => {
    return (
        <div className={styles.wrapper}>
            <Button ariaLabel='Back to main view' className={styles.back} type='button' onClick={onBackClick}>
                <Icon icon='chevron' />
                Back
            </Button>
            <span className={styles.title}>{title}</span>
            {onClearClick && (
                <button
                    className={styles.clear}
                    type='button'
                    aria-label='Clear this filter'
                    onClick={() => {
                        onClearClick();
                    }}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default FilterViewTitle;
