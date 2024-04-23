import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './LayersPanelToggleInput.module.scss';

export type Props = {
    children?: ReactNode;
    id: string;
    state: boolean;
    handler: (value: boolean) => void;
};

const LayersPanelToggleInput = ({ id, state = false, handler }: Props) => {
    return (
        <div className={styles.wrapper}>
            <input type='checkbox' id={id} checked={state} value={state.toString()} onChange={() => handler(!state)} />

            <button className={styles.track} onClick={() => handler(!state)}>
                <div className={classNames(styles.handle, { [styles.active]: state })} />
            </button>
        </div>
    );
};

export default LayersPanelToggleInput;
