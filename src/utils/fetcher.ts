import axios from 'axios'
import type { Fetcher } from 'swr'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher: Fetcher<any> = async (url: string) => {
    const response = await axios.get(url);
    return response.data ?? [];
}