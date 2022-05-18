export const debounce = func => {
	// create a timer
	let timer;
	// return a function with args
	return function (...args) {
		// get context.
		const context = this;
		// if the timer create above is enable, should be clearTimeout.
		if (timer) clearTimeout(timer);

		//
		timer = setTimeout(() => {
			timer = null;
			// just apply the function with current context
			func.apply(context, args);

			// the function above will run after 500 miliseconds
		}, 300);
	};
};
