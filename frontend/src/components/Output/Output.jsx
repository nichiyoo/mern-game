import * as PropTypes from 'prop-types';
import * as React from 'react';

import ErrorOutput from '@/components/Output/ErrorOutput';
import ExecuteOutput from '@/components/Output/ExecuteOutput';
import QueryOutput from '@/components/Output/QueryOutput';
import TableOutput from '@/components/Output/TableOutput';
import { cn } from '@/libs/utils';
import useOutputStore from '@/store/useOutputStore';

const MAPPER = {
	error: ErrorOutput,
	query: QueryOutput,
	result: TableOutput,
	execute: ExecuteOutput,
	incorrect: TableOutput,
};

const Output = ({ className }) => {
	const ref = React.useRef();
	const { outputs } = useOutputStore();

	React.useEffect(() => {
		if (ref.current) {
			ref.current.scrollTo({
				top: ref.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [outputs]);

	return (
		<div className='relative'>
			<div className='absolute px-4 py-2 text-sm font-bold uppercase -rotate-90 top-20 -left-16 text-coal rounded-t-xl bg-beige'>
				Outputs
			</div>

			<div ref={ref} className={ cn('w-full mb-10 bg-charcoal p-6 rounded-xl overflow-y-scroll', className)}>
				{outputs.map((output, index) => {
					const Component = MAPPER[output.type];
					return (
						<>
							<pre>{JSON.stringify(output, null, 2)}</pre>
							<Component key={index} output={output} />
						</>
					);
				})}
			</div>
		</div>
	);
};

Output.propTypes = {
	className: PropTypes.string,
};

export default Output;
