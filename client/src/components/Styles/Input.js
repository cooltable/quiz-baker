import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.span`
	margin: 10px 0;
	display: inline-block !important;
`;

export const StyledInput = styled.input`
	outline: none;
	border-radius: 3px;

	resize: none;
	font-size: 14px;

	color: #333333;
	background: #ffffff;
	padding: 0.429em;
	border: 1px solid #a6a6a6;
	&:focus {
		border-color: ${props => props.theme.pink};
	}

	&::placeholder {
		font-family: 'Raleway', sans-serif;
		color: #898989;
		font-size: 16px;
	}
`;

export const Input = ({ value, onChange, label, name, type, disabled, style, inputRef }) => (
	<InputWrapper className='p-float-label' style={style}>
		<StyledInput
			value={value}
			onChange={onChange}
			id={name}
			name={name}
			type={type}
			autoComplete='off'
			disabled={disabled}
			ref={inputRef}
		/>
		{label && <label htmlFor={name}>{label}</label>}
	</InputWrapper>
);

const StyledTextArea = styled.textarea`
	outline: none;
	border-radius: 3px;

	resize: none;
	font-size: 14px;
	margin-bottom: 10px;
	color: #333333;
	background: #ffffff;
	padding: 0.429em;
	border: 1px solid #a6a6a6;
	&:focus {
		border-color: ${props => props.theme.pink};
	}
`;

export const TextArea = ({ value, onChange, name, inputRef }) => (
	<StyledTextArea
		value={value}
		onChange={onChange}
		name={name}
		rows='5'
		ref={inputRef}
		style={{ width: '100%' }}
	/>
);
