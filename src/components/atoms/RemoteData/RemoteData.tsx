import React, { CSSProperties } from 'react';
import type { SWRResponse } from 'swr';

type RemoteDataProps<T> = {
    result: SWRResponse<T>;
    success: (data: T) => JSX.Element;
    style?: CSSProperties;
    error?: JSX.Element | false;
    loading?: JSX.Element | false;
    preferStaleDataOverError?: boolean;
};

// ToDo: Update default components
export const RemoteData = <T,>({
    result,
    success,
    style,
    error = <div>Error</div>,
    loading = <div>Loading</div>
}: RemoteDataProps<T>) => {
    const wrapper = (element: JSX.Element) => (style ? <div style={style}>{element}</div> : element);

    if (result.isLoading && loading !== false) return wrapper(loading);
    if (result.data !== undefined) return wrapper(success(result.data));
    if (result.error && error !== false) return wrapper(error);

    // Should never reach this point
    console.warn('RemoteData: Reached unexpected code');
    return <></>;
};
