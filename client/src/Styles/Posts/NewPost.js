import styled from 'styled-components';

export const NewPostWrapper = styled.div`
	display: flex;
	width: ${props => !props.userPage && '100%'};
	flex-direction: column;
	align-items: flex-start;
	position: relative;
	padding-bottom: 30px;
`;

export const InnerWrapper = styled.div`
	display: flex;
	width: 100%;
	border-radius: 4px;
	align-items: flex-start;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	flex-direction: column;
	padding: 10px;

	background-color: ${props => props.theme.secondary};
`;
