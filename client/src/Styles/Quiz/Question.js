import styled from 'styled-components';

export const Wrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 12px;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	width: 500px;
	min-height: 300px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);
	a {
		font-size: 24px;
		font-weight: 700;
		padding: 0 5px 0 0;
		color: ${props => props.theme.text};
		cursor: pointer;
	}
`;

export const AnswerWrapper = styled.div`
	margin-top: 15px;
	height: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const Answer = styled.div`
	padding-top: 4px;
	margin-left: 70px;
	&:not(:last-child) {
		padding-bottom: 10px;
	}

	.p-radiobutton .p-radiobutton-box.p-highlight {
		background-color: #dc758f;
		border: #dc758f;

		&:not(.p-disabled):hover {
			background-color: #ad546b;
			border: #ad546b;
		}
	}
`;

export const Label = styled.label`
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	padding-left: 4px;
	color: ${props => props.theme.text};
`;