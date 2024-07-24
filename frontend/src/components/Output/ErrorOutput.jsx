import PropTypes from 'prop-types';

export default function ErrorOutput({ output }) {
	return (
		<div className='flex justify-start mb-5'>
			<div className='px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md'>
				<span>{output.message.charAt(0).toUpperCase() + output.message.slice(1)}</span>
			</div>
		</div>
	);
}

ErrorOutput.propTypes = {
	output: PropTypes.shape({
		message: PropTypes.string.isRequired,
	}).isRequired,
};
