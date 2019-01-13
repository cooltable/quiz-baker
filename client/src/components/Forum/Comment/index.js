import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import blankProfile from '../../../assets/blank-profile.png';

const NewCommentArea = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	padding: 10px;

	position: relative;
	background-color: ${props => props.theme.secondary};
	.p-inputtext {
		margin-bottom: 10px;
	}
	.p-inputtext:enabled:focus:not(.p-error) {
		border-color: ${props => props.theme.accentPink};
	}
	.p-button {
		background-color: #dc758f;
		border: #dc758f;

		&:enabled:hover {
			background-color: #ad546b;
			border: #ad546b;
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em #ad546b;
		}
	}
`;

export const CommentArea = styled.div`
	padding: 0 16px;
	border-radius: 4px;
	border: 1px solid;
	width: 500px;
	border-color: ${props => props.theme.accent};

	margin-bottom: 10px;
	background-color: ${props => props.theme.secondary};
`;

export const NewComment = ({ user, commentInput, setCommentInput, handleClick, handleClose }) => (
	<NewCommentArea>
		<Button
			style={{ position: 'absolute', top: '5px', right: '5px' }}
			icon='pi pi-times'
			onClick={handleClose}
		/>
		<InputTextarea
			autoResize={true}
			value={commentInput}
			onChange={e => setCommentInput(e.target.value)}
		/>
		<Button label='Comment' onClick={handleClick} disabled={!commentInput} />
	</NewCommentArea>
);

const BigWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid;
	border-color: ${props => props.theme.accent};

	width: 100%;
	overflow: visible;
	transition: background 1s ease 0s;
	margin-top: 11px;
	padding-top: 5px;
	margin-bottom: 5px;

	.p-button {
		background-color: #dc758f;
		border: #dc758f;

		&:enabled:hover {
			background-color: #ad546b;
			border: #ad546b;
		}
		&:enabled:focus {
			box-shadow: 0 0 0 0.2em #ad546b;
		}
	}
`;

const CommentHeader = styled.div`
	display: flex;
	font-size: 12px;
	font-weight: 400;
	align-items: center;
	line-height: 16px;
	min-height: 18px;
	color: ${props => props.theme.link};

	span {
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;

		flex: 0 0 auto;
	}
	img {
		height: 20px;
		width: 20px;
		border-radius: 50%;
		margin-right: 3px;
	}
`;

const UserName = styled.a`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	color: ${props => props.theme.accentRed};
	padding-left: 3px;
`;

const CommentBody = styled.div`
	padding: 2px 0;
	width: 100%;
	font-size: 14px;
	font-weight: 400;
	line-height: 21px;
	overflow: auto;
`;

export const Comment = ({ comment, user, handleClick }) => (
	<BigWrapper>
		<div>
			<CommentHeader>
				<img src={comment.author_img ? comment.author_img : blankProfile} />
				Posted by <UserName>{comment.author}</UserName>
				<span style={{ padding: '0 3px' }}>&#8226;</span>
				<span>{moment(comment.created_at).fromNow()}</span>
			</CommentHeader>
			<CommentBody>
				<p>{comment.text}</p>
			</CommentBody>
		</div>
		{user.username === comment.author && <Button label='delete' onClick={handleClick} />}
	</BigWrapper>
);
