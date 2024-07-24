import * as React from 'react';

export default function ExecuteOutput({ output }) {
	return (
		<div className='flex justify-start mb-5'>
			<div className='bg-plant text-white font-medium px-4 py-2 rounded-md text-sm'>
				<span>{output.message}</span>
			</div>
		</div>
	);
}
