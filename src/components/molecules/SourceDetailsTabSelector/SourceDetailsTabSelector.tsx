import { useSourceDetailsSlice } from '@/store/useSourceDetailsSlice/useSourceDetailsSlice';
import ButtonUnderline from '@/components/atoms/ButtonUnderline/ButtonUnderline';
import styles from './SourceDetailsTabSelector.module.scss';

const SourceDetailsTabSelector = () => {
    const activeTab = useSourceDetailsSlice(state => state.activeTab);
    const setActiveTab = useSourceDetailsSlice(state => state.setActiveTab);
    const includeNullDetects = useSourceDetailsSlice(state => state.includeNullDetects);

    return (
        <div className={styles.tabs}>
            <ButtonUnderline
                tabs
                isActive={activeTab === 'observations'}
                onClick={() => setActiveTab('observations')}
                className={styles.tab}
            >
                {includeNullDetects ? 'Observations' : 'Plumes'}
            </ButtonUnderline>
            <ButtonUnderline
                tabs
                isActive={activeTab === 'supporting'}
                onClick={() => setActiveTab('supporting')}
                className={styles.tab}
            >
                Supporting Details
            </ButtonUnderline>
        </div>
    );
};

export default SourceDetailsTabSelector;
