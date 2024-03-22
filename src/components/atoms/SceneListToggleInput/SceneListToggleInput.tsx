import classNames from 'classnames';
import Button from '@/components/atoms/ButtonGeneric/ButtonGeneric';
import styles from './SceneListToggleInput.module.scss';

type Props = {
    state: boolean;
    handler: () => void;
    labelLeft?: string;
    labelRight?: string;
    colorState?: boolean;
};

const SceneListToggleInput = ({ state, handler, labelLeft, labelRight, colorState = true }: Props) => {
    return (
        <div className={styles.wrapper}>
            <label>
                {labelLeft && <span>{labelLeft}</span>}
                <input type='checkbox' checked={state} onChange={handler} />
            </label>
            <Button
                ariaLabel={`Toggle ${labelLeft ? labelLeft : labelRight} Scene List view.`}
                className={styles.track}
                onClick={handler}
            >
                <div
                    className={classNames(styles.handle, {
                        [styles.active]: !state,
                        [styles['color-state']]: colorState && !state
                    })}
                />
            </Button>
            <label>
                {labelRight && <span>{labelRight}</span>}
                <input type='checkbox' checked={!state} onChange={handler} />
            </label>
        </div>
    );
};

export default SceneListToggleInput;
