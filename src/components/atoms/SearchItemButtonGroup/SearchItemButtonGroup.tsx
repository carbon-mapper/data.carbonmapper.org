import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAlertItems, useAlertActions } from '@/store/useAlertStore/useAlertStore';
import { useSavedSearches } from '@/hooks/useSavedSearches';
import ConfirmationPopup from '@/components/molecules/ConfirmationPopup/ConfirmationPopup';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import styles from './SearchItemButtonGroup.module.scss';

const buttonOptions = {
    tiny: true,
    transparent: true
};

type Props = {
    isEditMode: boolean;
    className?: string;
    title: string;
    subtitle: string;
    onDelete: () => void;
    onEdit: () => void;
    onDiscardChanges: () => void;
    onApplyChanges: () => void;
};

export default function SearchItemButtonGroup({
    isEditMode,
    title,
    subtitle,
    className,
    onDelete,
    onEdit,
    onDiscardChanges,
    onApplyChanges
}: Props) {
    const [isConfirmationPopup, setIsConfirmationPopup] = useState(false);

    // TODO: temporarily attached to useSavedSearches
    const { data, error, isLoading } = useSavedSearches();
    const { setAll, toggle } = useAlertActions();
    const alertItems = useAlertItems();

    // TODO: remove this silliness
    const itemName = subtitle?.slice(0, subtitle.indexOf('(') - 1);
    const thisItem = alertItems.find(item => item.name === itemName);
    const name = thisItem?.name;
    const id = thisItem?.id;
    const isActive = thisItem?.alert;

    useEffect(() => {
        if (alertItems.length > 0 || data?.count === 0) return;
        console.log('alertItems changed', alertItems);
        // NOTE: these would get reset on SWR refetch
        const withAlerts = data?.items.map(item => ({ ...item, alert: false })) || [];
        setAll(withAlerts);
    }, [data, setAll, alertItems]);

    return (
        <div className={classNames(styles.wrapper, className)}>
            {isEditMode ? (
                <>
                    <ButtonIcon
                        className={styles.borderBtn}
                        icon='closer-medium'
                        ariaLabel='Discard changes'
                        options={{ ...buttonOptions }}
                        onClick={onDiscardChanges}
                    />
                    <ButtonIcon
                        className={styles.borderBtn}
                        icon='checkmark'
                        ariaLabel='Apply changes'
                        options={{ ...buttonOptions }}
                        onClick={onApplyChanges}
                    />
                </>
            ) : (
                <>
                    {/* <ButtonIcon
                        icon='bell'
                        // TODO: update with current state
                        className={classNames({
                            [styles.isActive]: isActive
                        })}
                        ariaLabel='Toggle alert'
                        onClick={() => {
                            console.log('toggle alert', name, id);
                            id && toggle(id);
                        }}
                        options={{ ...buttonOptions }}
                    />
                    <Separator width='1px' height='1.5em' color='var(--color-grey-light)' margin='0 0.33em' /> */}
                    <ButtonIcon
                        icon='delete'
                        ariaLabel='Delete search'
                        onClick={() => setIsConfirmationPopup(true)}
                        options={{ ...buttonOptions }}
                    />
                    <ButtonIcon
                        icon='edit'
                        ariaLabel='Edit search name'
                        onClick={onEdit}
                        options={{ ...buttonOptions }}
                    />

                    <ConfirmationPopup
                        portalId='popups'
                        title={title}
                        subtitle={subtitle}
                        cancelButtonText='Cancel'
                        agreeButtonText='Delete'
                        isOpen={isConfirmationPopup}
                        onClose={() => setIsConfirmationPopup(false)}
                        onAgree={() => {
                            onDelete();
                            setIsConfirmationPopup(false);
                        }}
                        onCancel={() => setIsConfirmationPopup(false)}
                    />
                </>
            )}
        </div>
    );
}

function Separator({
    width = '1px',
    height = '1px',
    color,
    margin
}: {
    width: string;
    height: string;
    color: string;
    margin: string;
}) {
    return (
        <div
            style={{
                width,
                height,
                backgroundColor: color,
                margin
            }}
        />
    );
}
