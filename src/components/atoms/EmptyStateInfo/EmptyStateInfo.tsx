import classNames from 'classnames';
import { ReactElement } from 'react';
import ButtonBox from '../ButtonBox/ButtonBox';
import styles from './EmptyStateInfo.module.scss';

const EmptyStateInfo = ({
    title,
    text,
    reRoute,
    isTiny,
    className
}: {
    title?: string;
    text?: string | ReactElement;
    reRoute?: {
        text: string;
        handler: () => void;
    };
    isTiny?: boolean;
    className?: string;
}) => {
    return (
        <div className={classNames(styles.wrapper, { 'is-tiny': isTiny }, className)}>
            <h4>{title}</h4>
            {text && <p>{text}</p>}
            {reRoute && <ButtonBox onClick={reRoute.handler}>{reRoute.text}</ButtonBox>}
        </div>
    );
};

export default EmptyStateInfo;
