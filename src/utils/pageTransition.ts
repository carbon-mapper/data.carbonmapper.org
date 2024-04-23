

export const duration = 1;


export const pageTransition = {
	animate: {
		opacity: 1, 
		transition: {
			delay: 0,
			duration: 0 
		}
	},
	exit: { 
		opacity: 0, 
		transition: {
			 delay: duration, 
			 duration: 0 
		} 
	},
	initial: {
		opacity: 0
	}
}