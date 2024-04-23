import { ReactNode } from 'react';
import ButtonIcon from '@/components/atoms/ButtonIcon/ButtonIcon';
import styles from './InputGroup.module.scss';

function InputGroup({
    title,
    button,
    gridArea,
    children
}: {
    title: ReactNode;
    button: {
        label: string;
        handler: () => void;
    };
    gridArea: string;
    children: React.ReactNode;
}) {
    return (
        // fieldset?
        <div className={styles.wrapper} style={{ gridArea }}>
            <legend className={styles.legend}>{title}</legend>
            {children}
            <ButtonIcon
                ariaLabel={button.label}
                options={{
                    tiny: true,
                    border: true
                }}
                icon='plus'
                onClick={button.handler}
                className={styles.add}
            />
        </div>
    );
}

export default InputGroup;
