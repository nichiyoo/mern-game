import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Function to merge the tailwind classnames
 * @param {*} args
 * @returns {string} merged classnames
 */
export const cn = (...args) => {
	return twMerge(clsx(...args));
};
