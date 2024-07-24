import PropTypes from 'prop-types';
import { cn } from '@/libs/utils';
import useQueryStore from '@/store/useQueryStore';

const TableOutput = ({ output }) => {
	const { appendQuery } = useQueryStore();

	const { result } = output;
	const keys = [
		...new Set(
			result.reduce((acc, row) => {
				return acc.concat(Object.keys(row));
			}, [])
		),
	];

	const toQuery = (value) => {
		if (value === null) return 'NULL';
		if (typeof value === 'string') return `"${value}"`;
		return value;
	};

	return (
		<div className='mb-5 text-sm'>
			{result.length > 0 ? (
				<div className='overflow-x-auto'>
					<table className='w-full bg-coal rounded-t-md'>
						<thead>
							<tr className='border-b border-charcoal'>
								{keys.map((key) => (
									<th key={key} className='p-1 text-left text-neutral-200 max-w-20'>
										<div
											onClick={() => appendQuery(key)}
											className='w-full px-3 py-1 truncate rounded-md cursor-pointer hover:bg-white/10'>
											{key}
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{result.map((row, idx) => (
								<tr key={idx}>
									{Object.values(row).map((value, idx) => {
										return (
											<td key={idx} className='p-1 text-left text-neutral-200 max-w-20'>
												<div
													onClick={() => appendQuery(toQuery(value))}
													className='w-full px-3 py-1 truncate rounded-md cursor-pointer hover:bg-white/10'>
													{value || 'NULL'}
												</div>
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className='px-4 py-2 text-white bg-coal rounded-t-md'>No data found</div>
			)}
			<div
				className={cn('px-4 py-2 rounded-b-md text-coal', output.type === 'incorrect' ? 'bg-rose' : 'bg-gold')}>
				{output.message}
			</div>
		</div>
	);
};

TableOutput.propTypes = {
	output: PropTypes.shape({
		type: PropTypes.string.isRequired,
		result: PropTypes.arrayOf(PropTypes.object).isRequired,
		message: PropTypes.string.isRequired,
	}).isRequired,
};

export default TableOutput;
