import styled from 'styled-components';

export const Svg = styled.svg<{ $selected: boolean }>`
	fill: ${({ theme }) => theme.normalText};

	stroke: ${({ $selected, theme }) => ($selected ? theme.normalText : 'none')};
	stroke-width: ${({ $selected }) => ($selected ? 2 : 0)};
`;
