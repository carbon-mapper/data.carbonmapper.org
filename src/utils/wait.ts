export const wait = (time: number) => new Promise(resolve => {
	setTimeout(() => {
		resolve(true);
	}, time * 1000);
})