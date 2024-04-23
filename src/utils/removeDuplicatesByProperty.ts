/* eslint-disable @typescript-eslint/no-explicit-any */

export const removeDuplicatesByProperty = <T>(array: Array<{ [key: string]: any }>, property: string): T => {

	return [...array].reduce((accumulator, current) => {

		if (!accumulator.find((item: any) => item[property] === current[property])) {
			accumulator.push(current);
		}

		return accumulator;

	}, []) as T;

}