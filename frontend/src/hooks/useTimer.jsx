import * as React from 'react';

const second = (value) => Math.floor(value / 1000);

const useTimer = (start, interval = 1000) => {
	const [elapsed, setElapsed] = React.useState(second(new Date() - start));

	React.useEffect(() => {
		const timer = setInterval(() => {
			setElapsed(second(new Date() - start));
		}, interval);

		return () => clearInterval(timer);
	}, [start, interval]);

	return elapsed;
};

export default useTimer;
