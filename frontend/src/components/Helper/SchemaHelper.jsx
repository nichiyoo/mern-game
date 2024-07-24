import { Clipboard } from 'lucide-react';
import useQueryStore from '@/store/useQueryStore';

const tables = [
	{
		name: 'villages',
		columns: [
			{ name: 'id', type: 'integer' },
			{ name: 'name', type: 'text' },
			{ name: 'chief', type: 'integer' },
		],
	},
	{
		name: 'inhabitants',
		columns: [
			{ name: 'id', type: 'integer' },
			{ name: 'name', type: 'text' },
			{ name: 'gender', type: 'text' },
			{ name: 'job', type: 'text' },
			{ name: 'gold', type: 'integer' },
			{ name: 'status', type: 'text' },
			{ name: 'village', type: 'integer' },
		],
	},
	{
		name: 'items',
		columns: [
			{ name: 'id', type: 'integer' },
			{ name: 'name', type: 'text' },
			{ name: 'owner', type: 'integer' },
		],
	},
];

const SchemaHelper = () => {
	const { appendQuery } = useQueryStore();

	return (
		<>
			{tables.map((table) => (
				<div key={table.name} className='relative p-2 bg-beige rounded-xl'>
					<div
						onClick={() => appendQuery(table.name)}
						className='absolute px-4 py-2 text-sm font-bold text-white uppercase origin-top-left transform rotate-90 translate-x-full cursor-pointer top-3 -right-9 bg-plant rounded-t-xl'>
						{table.name}
					</div>
					<ul className='flex flex-col list-inside divide-y text-charcoal divide-charcoal/10'>
						{table.columns.map((column) => (
							<li key={column.name} className='cursor-pointer' onClick={() => appendQuery(column.name)}>
								<div className='flex items-center justify-between px-2 py-1 rounded-md group hover:bg-charcoal/10'>
									<span className='text-sm font-medium'>{column.name}</span>
									<Clipboard className='hidden w-4 h-4 group-hover:block' />
								</div>
							</li>
						))}
					</ul>
				</div>
			))}
		</>
	);
};

export default SchemaHelper;
