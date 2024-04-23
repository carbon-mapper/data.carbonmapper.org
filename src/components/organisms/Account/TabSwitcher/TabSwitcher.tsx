import { useAccountActions, useAccountView } from '@/store/useAccountStore/useAccountStore';
import Divider from '@/components/atoms/Divider/Divider';
import TabSwitch from '../TabSwitch/TabSwitch';
import styles from './TabSwitcher.module.scss';

const TabSwitcher = () => {
    const { setView } = useAccountActions();
    const view = useAccountView();

    return (
        <header key={`${view}-tab_switcher`} className={styles.container}>
            <TabSwitch name='login' handler={setView} isActive={view === 'login'} />
            <Divider orientation='vertical' isGridChild />
            <TabSwitch name='register' handler={setView} isActive={view === 'register'} />
        </header>
    );
};

export default TabSwitcher;
