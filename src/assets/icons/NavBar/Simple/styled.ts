import styled from 'styled-components';

export const Svg = styled.svg<{ $selected: boolean }>`
	fill: ${({ theme }) => theme.textMain};

	stroke: ${({ $selected, theme }) => ($selected ? theme.textMain : 'none')};
	stroke-width: ${({ $selected }) => ($selected ? 2 : 0)};
`;
