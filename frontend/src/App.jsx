import * as React from 'react';

import { Code } from 'lucide-react';
import CommandHelper from '@/components/Helper/CommandHelper';
import Editor from '@/components/Editor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Output from '@/components/Output/Output';
import SchemaHelper from '@/components/Helper/SchemaHelper';
import useClientStore from '@/store/useClientStore';
import useOutputStore from '@/store/useOutputStore';
import useQueryStore from '@/store/useQueryStore';
import useTypewriter from '@/hooks/useTypewriter';

import { AxiosError, axios } from '@/libs/axios';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
	const { client, setClient } = useClientStore();
	const { appendOutputs } = useOutputStore();
	const { query, setQuery } = useQueryStore();

	const [text, completed] = useTypewriter('SELECT * FROM villages', false, 10);

	React.useEffect(() => {
		const fetchClient = async () => {
			try {
				const { data } = await axios.get('/client');
				setClient(data.client);
			} catch (error) {
				if (error instanceof AxiosError) toast.error(error.response?.data.message);
				else toast.error(error.message);
			}
		};

		if (!client) fetchClient();
	}, [client, setClient]);

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			appendOutputs({ type: 'query', query });

			const { data } = await axios.post('/query', { query });
			const { client, ...result } = data;

			appendOutputs({ ...result });
			setClient(client);
		} catch (error) {
			if (error instanceof AxiosError) appendOutputs({ ...error.response.data });
			else appendOutputs({ type: 'error', message: error.message });
		}
	};

	return (
		<>
			<Toaster
				position='top-left'
				reverseOrder={false}
				toastOptions={{
					duration: 5000,
					className: 'shadow-none font-outfit border-2 border-charcoal text-sm px-4 py-2 font-normal',
				}}
			/>

			<main className='w-full min-h-screen px-8 mx-auto antialiased leading-relaxed text-beige max-w-7xl font-outfit scroll-smooth'>
				<Navbar />

				<div className='py-10'>
					<div className='flex flex-col items-center mb-10'>
						<h1 className='mb-5 text-center text-7xl text-beige font-paytone'>SQL Adventure</h1>
						<p className='w-full max-w-md text-center text-muted'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque cumque vero aperiam
							praesentium blanditiis quas inventore atque vitae optio quod!
						</p>
					</div>

					<div className='grid items-start grid-cols-1 gap-8 lg:grid-cols-4'>
						<div className='lg:col-span-3'>
							<Output className='aspect-[4/3]' />

							<form onSubmit={onSubmit}>
								<div className='relative p-5 mb-6 bg-white text-zinc-900 rounded-xl'>
									<Code className='absolute top-0 right-0 w-5 h-5 m-6' />

									<Editor
										language='sql'
										disabled={!completed}
										value={!completed ? text : query}
										setValue={(value) => setQuery(value)}
										className='min-h-20'
									/>
								</div>

								<div className='flex justify-end space-x-2'>
									<button
										type='button'
										onClick={() => setQuery('')}
										disabled={!completed || query.trim() === ''}
										className='px-6 py-2 text-sm font-bold text-white uppercase border-2 rounded-full bg-charcoal border-charcoal'>
										Clear
									</button>

									<button
										type='submit'
										disabled={!completed || query.trim() === ''}
										className='px-6 py-2 text-sm font-bold text-white uppercase border-2 rounded-full bg-gold border-charcoal disabled:bg-charcoal'>
										Submit
									</button>
								</div>
							</form>
						</div>

						<div className='flex flex-col order-first mb-10 space-y-6 lg:order-none lg:col-span-1 lg:mb-0'>
							<div>
								<h3 className='text-lg text-beige font-paytone'>Queries Helper</h3>
								<p className='text-muted'>Click on the buttons to add the query to the editor</p>
							</div>

							<CommandHelper />
							<SchemaHelper />
						</div>
					</div>
				</div>

				<Footer />
			</main>
		</>
	);
}
