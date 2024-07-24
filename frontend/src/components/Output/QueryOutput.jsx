import * as React from 'react';

export default function QueryOutput({ output }) {
	return (
		<div className='flex justify-end mb-5'>
			<div className='bg-coal text-white font-medium px-4 py-2 rounded-md text-sm'>
				<span>{output.query}</span>
			</div>
		</div>
	);
}
