import classNames from 'classnames';
import Image from 'next/image';
import Tooltip from '../Tooltip/Tooltip';
import styles from './LayersPanelButton.module.scss';

export type Props = {
    name: string;
    src: string;
    alt: string;
    state: string;
    setState: (value: string) => void;
    canDisable?: boolean;
};

const LayersPanelButton = ({ name, alt, src, state, setState, canDisable }: Props) => {
    const onClickHandlerWithDisabler = () => {
        name === state ? setState('') : setState(name);
    };
    const onClickHandler = () => setState(name);

    return (
        <button
            className={classNames(styles.button, 'tooltip-trigger', {
                [styles['active']]: name === state
            })}
            onClick={canDisable ? onClickHandlerWithDisabler : onClickHandler}
        >
            <Tooltip text={alt} position='top' inline />
            <Image src={src} alt={alt} fill />
        </button>
    );
};

export default LayersPanelButton;
