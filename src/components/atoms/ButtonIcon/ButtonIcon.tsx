import classNames from 'classnames';
import type { MouseEvent } from 'react';
import { memo } from 'react';
import type { IconName } from '@/components/atoms/Icon/Icon';
import { trackEvent } from '@/hooks/useGTM';
import { type Props as TooltipProps } from '@/components/atoms/Tooltip/Tooltip';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import styles from './ButtonIcon.module.scss';

type Props = {
    icon: IconName;
    ariaLabel: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    noTracking?: boolean;
    className?: string;
    options?: {
        blue?: boolean;
        active?: boolean;
        hidden?: boolean;
        blur?: boolean;
        transparent?: boolean;
        tiny?: boolean;
        opaque?: boolean;
        border?: boolean;
    };
    cyID?: string;
    tooltip?: TooltipProps;
};

const ButtonIcon = ({
    icon,
    ariaLabel,
    onClick,
    disabled = false,
    noTracking = false,
    options,
    tooltip,
    className: propClassName,
    cyID
}: Props) => {
    const className = classNames(styles.button, {
        [styles.isHidden]: options?.hidden,
        [styles.isActive]: options?.active,
        [styles.isBlue]: options?.blue,
        [styles.isOpaque]: options?.opaque,
        [styles.isTiny]: options?.tiny,
        [`${propClassName}`]: propClassName
    });

    const bgClassName = classNames(styles.background, {
        [styles.isActiveBg]: options?.active,
        [styles.isBlueBg]: options?.blue,
        [styles.isBlurBg]: options?.blur,
        [styles.isOpaqueBg]: options?.opaque,
        [styles.transparent]: options?.transparent,
        [styles.border]: options?.border
    });

    function onClickTracked(event: MouseEvent<HTMLButtonElement>) {
        onClick?.(event);
        trackEvent({
            event: 'button_click',
            button_text: ariaLabel,
            button_url: window.location.href
        });
    }

    return (
        <button
            // TODO: investigate if this does't break anything
            type='button'
            aria-label={ariaLabel}
            className={className}
            onClick={noTracking ? onClick : onClickTracked}
            disabled={disabled}
            data-cy-id={cyID}
        >
            {!options?.transparent && <span className={classNames('button_bg', bgClassName)} />}
            <span className={styles.content}>
                <span className='sr-only'>{ariaLabel}</span>
                <Icon icon={icon} />
            </span>
            {tooltip && <Tooltip text={tooltip.text} position={tooltip.position} inline />}
        </button>
    );
};

export default memo(ButtonIcon);
// TODO: investigate suspected useless memoization
