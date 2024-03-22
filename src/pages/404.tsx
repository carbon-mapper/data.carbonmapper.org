import Link from 'next/link';
import { useEffect } from 'react';
import { useSetIsPageLoaded } from '@/store/useGlobalStore/useGlobalStore';
import Gradient from '@/components/atoms/Gradient/Gradient';

export default function NotFound() {
    const setIsPageLoaded = useSetIsPageLoaded();

    useEffect(() => {
        document.body.classList.add('is-loaded');
        setIsPageLoaded(true);
    }, [setIsPageLoaded]);
    return (
        <section className='page-404'>
            <h1>Page not found</h1>
            <Link href='/'>Go back to home screen</Link>
            <Gradient isFullWidth />
        </section>
    );
}
