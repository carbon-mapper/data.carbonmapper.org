import { ReactNode } from 'react';

// I am tempted to delete the rest of this
export default function LocalStorageProvider({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

export const save = <T,>(data: T, key: string) => {
    if (typeof window === 'undefined') return;

    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
};

export const load = <T,>(key: string): T | null => {
    if (typeof window === 'undefined') return null;

    const data = localStorage.getItem(key);

    if (!data) return null;

    return JSON.parse(data);
};
