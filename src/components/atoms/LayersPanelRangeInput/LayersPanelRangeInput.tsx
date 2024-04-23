import classNames from 'classnames';
import styles from './LayersPanelRangeInput.module.scss';

type Props = {
    id: string;
    value: number;
    setValue: (value: number) => void;
    setValueOnEnd: (value: number) => void;
    inside?: boolean;
};

const LayersPanelRangeInput = ({ id, value, setValue, inside, setValueOnEnd }: Props) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setValue(Number(event.target.value));
    const onMouseUpHandler = (event: React.MouseEvent<HTMLInputElement>) => setValueOnEnd(Number(event.currentTarget.value));

    return (
        <div className={classNames(styles.wrapper, { [styles.inside]: inside })}>
            <input type='range' id={id} min={0} max={1} step={0.1} value={value} onChange={onChangeHandler} onMouseUp={onMouseUpHandler} />
            <div className={styles.track}>
                <div
                    className={styles.fill}
                    style={{
                        right: `${(1 - value) * 100}%`
                    }}
                />
                <button
                    className={styles.handle}
                    style={{
                        left: `${value * 100}%`
                    }}
                ></button>
            </div>
        </div>
    );
};

export default LayersPanelRangeInput;
