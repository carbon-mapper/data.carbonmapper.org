import classNames from 'classnames';
import type { AccountView } from '@/store/useAccountStore/useAccountStore';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import styles from './TabSwitch.module.scss';

const TabSwitch = ({
    name,
    handler,
    isActive
}: {
    name: AccountView;
    handler: (name: AccountView) => void;
    isActive: boolean;
}) => (
    <Button
        className={classNames(styles.button, {
            [styles['is-active']]: isActive
        })}
        onClick={() => handler(name)}
    >
        {name}
    </Button>
);

export default TabSwitch;
