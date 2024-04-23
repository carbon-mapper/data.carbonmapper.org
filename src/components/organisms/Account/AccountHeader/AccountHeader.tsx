import classNames from 'classnames';
import { ReactElement } from 'react';
import ButtonBox from '@/components/atoms/ButtonBox/ButtonBox';
// import ButtonIcon from '@/components/atoms/ButtonIcon/ButtonIcon';

import styles from './AccountHeader.module.scss';

const AccountHeader = ({
    title,
    subtitle,
    backButtonHandler
}: {
    title: string | ReactElement;
    subtitle?: string;
    backButtonHandler?: () => void;
}) => {
    return (
        <header
            className={classNames(styles.container, {
                [styles.profile]: subtitle
            })}
        >
            {backButtonHandler && (
                <ButtonBox
                    user
                    onClick={backButtonHandler}
                    icon='chevron-down'
                    ariaLabel='Back'
                    trackingTitle={`Back from ${title}`}
                />
            )}
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </header>
    );
};

export default AccountHeader;
