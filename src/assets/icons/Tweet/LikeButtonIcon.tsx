import styled from 'styled-components';

type LikeButtonProps = {
	liked: boolean;
};

const Svg = styled.svg<{ $liked: boolean }>`
	transition: fill 0.1s ease-in-out;
	fill: ${({ $liked, theme }) => ($liked ? theme.likedLike : theme.subtext)};
`;

export const LikeButtonIcon = ({ liked }: LikeButtonProps) => (
	<Svg
		$liked={liked}
		width='21'
		height='19'
		viewBox='0 0 21 19'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M10.05 18.914H10.036C7.453 18.866 0 12.132 0 5.754C0 2.69 2.525 0 5.403 0C7.693 0 9.233 1.58 10.049 2.73C10.863 1.582 12.403 0 14.694 0C17.574 0 20.098 2.69 20.098 5.755C20.098 12.131 12.644 18.865 10.061 18.912H10.05V18.914ZM5.404 1.501C3.324 1.501 1.501 3.489 1.501 5.756C1.501 11.496 8.535 17.352 10.051 17.414C11.569 17.352 18.601 11.497 18.601 5.756C18.601 3.489 16.778 1.501 14.698 1.501C12.17 1.501 10.758 4.437 10.746 4.466C10.516 5.028 9.59 5.028 9.359 4.466C9.345 4.436 7.93401 1.501 5.40501 1.501H5.404Z' />
	</Svg>
);
