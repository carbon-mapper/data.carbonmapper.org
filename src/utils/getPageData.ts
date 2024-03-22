export const getPageData = async (url: string) => {
	const res = await fetch(`${process.env.API_URL}=${url}`, { cache: 'no-cache' });
	return await res.json();
}