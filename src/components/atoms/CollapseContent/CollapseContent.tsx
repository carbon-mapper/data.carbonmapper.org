import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import Icon from '@/components/atoms/Icon/Icon';
import styles from './CollapseContent.module.scss';

export const CollapseContent = ({ title, content }: { title: string; content: ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <>
            <button
                className={classNames(styles.header, { [styles.isCollapsed]: isCollapsed })}
                onClick={() => setIsCollapsed(bool => !bool)}
            >
                <h3>{title}</h3>
                <Icon icon='chevron' />
            </button>
            <div className={classNames(styles.content, { [styles.isCollapsed]: isCollapsed })}>{content}</div>
        </>
    );
};
