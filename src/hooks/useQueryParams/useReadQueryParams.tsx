import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useReadAuthParams() {
    const [uidb64, setUidb64] = useState('');
    const [token, setToken] = useState('');
    const searchParams = useSearchParams();

    const uidb64Param = searchParams.get('uidb64');
    const tokenParam = searchParams.get('token');

    useEffect(() => {
        if (!uidb64Param || !tokenParam) return;
        setUidb64(uidb64Param);
        setToken(tokenParam);
    }, [uidb64Param, tokenParam]);

    return { uidb64, token };
}
