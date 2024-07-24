import useClientStore from '@/store/useClientStore';
import useTimer from '@/hooks/useTimer';

import { Gamepad, Star, Timer } from 'lucide-react';
import { humanizeTime, toLocalTime } from '@/libs/formatter';

export default function Navbar() {
	const { client } = useClientStore();
	const elapsed = useTimer(toLocalTime(client?.updatedAt));

	return (
		<div className='flex items-center justify-between py-6'>
			<div className='flex items-center'>
				<span className='-mt-2 text-2xl font-paytone me-10'>Game</span>
				<ul className='flex items-center space-x-4'>
					<li>
						<a href='#' className='text-white'>
							Game
						</a>
					</li>
					<li>
						<a href='/#' className='text-white'>
							Leaderboard
						</a>
					</li>
				</ul>
			</div>
			<div className='flex space-x-2'>
				<div className='flex items-center px-4 py-2 space-x-2 uppercase border-2 rounded-full bg-rose border-charcoal'>
					<Timer className='w-5 h-5' />
					<span className='text-sm font-bold'>{humanizeTime(elapsed)}</span>
				</div>

				<div className='flex items-center px-4 py-2 space-x-2 uppercase border-2 rounded-full bg-gold border-charcoal'>
					<Star className='w-5 h-5' />
					<span className='text-sm font-bold'>{client?.score}</span>
				</div>

				<div className='flex items-center px-4 py-2 space-x-2 uppercase border-2 rounded-full bg-plant border-charcoal'>
					<Gamepad className='w-5 h-5' />
					<span className='text-sm font-bold'>{client?.step}</span>
				</div>
			</div>
		</div>
	);
}
