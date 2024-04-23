import { motion } from 'framer-motion';
import { usePanelActions } from '@/store/usePanelStore/usePanelStore';
import { useSavedSearches } from '@/hooks/useSavedSearches';
import EmptyStateInfo from '@/components/atoms/EmptyStateInfo/EmptyStateInfo';
import Modal from '@/components/atoms/Modal/Modal';
import { RemoteData } from '@/components/atoms/RemoteData/RemoteData';
import { SearchItemDisplay } from '@/components/molecules/SearchItemDisplay/SearchItemDisplay';
import withPortal from '@/hoc/withPortal';
import styles from './DashboardSavedSearches.module.scss';

const DashboardSavedSearches = () => {
    const { setLeftPanel } = usePanelActions();
    const savedSearchesQuery = useSavedSearches();
    const { data } = savedSearchesQuery;

    return (
        <motion.div className={styles.wrapper}>
            <Modal
                title={
                    <>
                        <span>Saved Searches</span>
                        {data && <Counter count={data.count} />}
                    </>
                }
                onClose={() => setLeftPanel(null)}
                onEscape={() => setLeftPanel(null)}
                isDarkBg
                className={styles.modal}
            >
                <RemoteData
                    result={savedSearchesQuery}
                    loading={<EmptyStateInfo className={styles.info} title='Loading...' />}
                    error={<EmptyStateInfo className={styles.info} title='Error' text='Error loading saved searches' />}
                    success={({ items: searches, count }) => {
                        if (count === 0) {
                            return (
                                <EmptyStateInfo
                                    className={styles.info}
                                    title='No Saved Searches'
                                    text='Select your filters and create a Saved Search.'
                                    reRoute={{
                                        text: 'Search',
                                        handler: () => {
                                            setLeftPanel('filters');
                                        }
                                    }}
                                />
                            );
                        }

                        // avoid mutating the original array
                        const sortedSearches = [...searches].sort((a, b) => (a.modified > b.modified ? -1 : 1));

                        return (
                            <ul className={styles.list}>
                                {sortedSearches.map(search => (
                                    <li className={styles.item} key={search.id}>
                                        <SearchItemDisplay search={search} onMutate={savedSearchesQuery.mutate} />
                                    </li>
                                ))}
                            </ul>
                        );
                    }}
                />
            </Modal>
        </motion.div>
    );
};

export default withPortal(DashboardSavedSearches);

function Counter({ count }: { count: number }) {
    return (
        <span className={styles.counter}>
            <span>{count}</span>
        </span>
    );
}
