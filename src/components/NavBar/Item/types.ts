import { IconProps } from '@assets/icons/NavBar/Simple/types';

export type Props = {
	text: string;
	Icon: ({ selected }: IconProps) => JSX.Element;
	to: string;
};
