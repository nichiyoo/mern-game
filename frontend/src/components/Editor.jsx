import PropTypes from 'prop-types';
import SimpleEditor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

const Editor = ({ value, setValue, language, className, ...props }) => {
	const grammar = languages[language] || languages.plain;

	return (
		<SimpleEditor
			value={value}
			onValueChange={setValue}
			highlight={(code) => highlight(code, grammar, language)}
			className={className}
			{...props}
		/>
	);
};

Editor.propTypes = {
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
	language: PropTypes.string.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Editor;
