import { SourceDataTypes } from '@/types/api/source.types';
import useSWRImmutable from 'swr/immutable';
import { useIsLoggedIn } from '@/store/useAccountStore/useAccountStore';
import { getAccessToken } from '@/utils/auth';
import { httpGet } from '@/utils/httpClient';

// This endpoint is odd because internal users have different source names than external users
export const useSourceByNameData = (name: string | null) => {
    const isLoggedIn = useIsLoggedIn();

    const {
        data,
        error: isError,
        isLoading
    } = useSWRImmutable<SourceDataTypes.Data>(
        name && { url: `/catalog/source/${name}`, isLoggedIn, token: getAccessToken() },
        httpGet
    );

    return {
        data,
        isError,
        isLoading
    };
};
