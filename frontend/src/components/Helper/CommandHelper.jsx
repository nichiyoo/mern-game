import PropTypes from 'prop-types';
import { cn } from '@/libs/utils';
import useQueryStore from '@/store/useQueryStore';

const commands = [
	'*',
	'=',
	'IS',
	'SELECT',
	'FROM',
	'WHERE',
	'ORDER BY',
	'GROUP BY',
	'LIMIT',
	'OFFSET',
	'JOIN',
	'ON',
	'AS',
	'DISTINCT',
	'COUNT',
];

const CommandHelper = ({ className }) => {
	const { appendQuery } = useQueryStore();

	return (
		<div className={cn('flex flex-wrap gap-2', className)}>
			{commands.map((command) => (
				<button
					key={command}
					onClick={() => appendQuery(command)}
					className='px-3 py-1 text-sm font-medium text-white uppercase border-2 rounded-full bg-charcoal border-coal'>
					{command}
				</button>
			))}
		</div>
	);
};

CommandHelper.propTypes = {
	className: PropTypes.string,
};

export default CommandHelper;
