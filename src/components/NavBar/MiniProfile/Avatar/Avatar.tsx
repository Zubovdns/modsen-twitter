import { AvatarContainer, AvatarImage } from './styled';
import { AvatarProps } from './types';

export const Avatar = ({ src, alt }: AvatarProps) => (
	<AvatarContainer>
		{src && <AvatarImage src={src} alt={alt} />}
	</AvatarContainer>
);
