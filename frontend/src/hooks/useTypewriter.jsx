import * as React from 'react';

const useTypewriter = (text, loop = false, interval = 100) => {
	const [completed, setCompleted] = React.useState(false);
	const [index, setIndex] = React.useState(0);

	const advance = (text, index) => {
		const next = index + 1;
		if (next >= text.length) {
			if (loop) return [0, true];
			return [index, true];
		}
		return [next, false];
	};

	const letter = (text, index) => {
		if (index >= text.length) {
			setCompleted(true);
			return [index, true];
		}
		if (text[index] === ' ') return letter(text, index + 1);
		return advance(text, index);
	};

	React.useEffect(() => {
		const timer = setInterval(() => {
			const [next, isCompleted] = letter(text, index);
			setIndex(next);
			setCompleted(isCompleted);
		}, interval);

		return () => clearInterval(timer);
	}, [text, interval, index]);

	return text.length > 0 ? [text.slice(0, index + 1), completed] : ['', completed];
};

export default useTypewriter;
