import { ReactNode } from 'react';

export const Fieldset = ({ children, legend }: { children: ReactNode; legend?: string | ReactNode }) => {
    return (
        <fieldset>
            {legend && <legend className='sr-only'>{legend}</legend>}
            {children}
        </fieldset>
    );
};
