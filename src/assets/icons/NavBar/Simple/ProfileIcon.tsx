import { Svg } from './styled';
import { IconProps } from './types';

export const ProfileIcon = ({ selected }: IconProps) => (
	<Svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		$selected={selected}
	>
		<path d='M11.351 12.16C12.706 12.16 14.223 12.01 15.191 10.904C16.005 9.974 16.269 8.536 15.997 6.512C15.617 3.687 13.88 2 11.351 2C8.82198 2 7.08498 3.687 6.70498 6.514C6.43298 8.536 6.69698 9.974 7.51098 10.904C8.47898 12.011 9.99598 12.16 11.351 12.16ZM8.19098 6.712C8.35298 5.512 8.97798 3.5 11.351 3.5C13.724 3.5 14.349 5.513 14.511 6.712C14.718 8.262 14.568 9.339 14.061 9.917C13.606 10.437 12.795 10.66 11.351 10.66C9.90698 10.66 9.09598 10.437 8.64098 9.917C8.13398 9.339 7.98398 8.261 8.19098 6.712ZM19.631 19.58C18.754 16.054 15.349 13.59 11.351 13.59C7.35298 13.59 3.94798 16.054 3.07098 19.58C2.89898 20.272 3.04298 20.98 3.46598 21.52C3.87398 22.04 4.50598 22.34 5.19898 22.34H17.503C18.196 22.34 18.828 22.04 19.236 21.52C19.66 20.98 19.803 20.273 19.63 19.58H19.631ZM18.055 20.596C17.929 20.756 17.739 20.842 17.503 20.842H5.19898C4.96398 20.842 4.77298 20.757 4.64698 20.596C4.50998 20.422 4.46698 20.184 4.52698 19.942C5.23698 17.087 8.04398 15.092 11.351 15.092C14.658 15.092 17.465 17.086 18.175 19.942C18.235 20.184 18.192 20.422 18.055 20.596Z' />
	</Svg>
);
