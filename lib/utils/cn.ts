import clsx, {type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

// Allows merging of Tailwind class
export default function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
