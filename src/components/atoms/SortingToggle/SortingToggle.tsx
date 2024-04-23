import classNames from 'classnames';
import { MouseEvent, ReactElement } from 'react';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import Icon from '../Icon/Icon';
import styles from './SortingToggle.module.scss';

type Props = {
    label: string | ReactElement;
    isAscending: boolean;
    isActive: boolean;
    handler: (event: MouseEvent) => void;
};

const SortingToggle = ({ label, isAscending, isActive, handler }: Props) => {
    return (
        <Button
            ariaLabel={`Sort by ${label} in ${isAscending ? 'ascending' : 'descending'} order.`}
            className={classNames(styles.button, {
                [styles.up]: isAscending,
                [styles.active]: isActive
            })}
            onClick={handler}
        >
            <span>{label}</span>
            <Icon icon='chevron-down' />
        </Button>
    );
};

export default SortingToggle;
