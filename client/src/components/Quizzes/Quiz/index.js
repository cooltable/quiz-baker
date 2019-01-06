import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';

import {Button} from 'primereact/button'
import {Tooltip} from 'primereact/tooltip';

const QuizWrapper = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	display: flex;
	background-color: ${props => props.theme.secondary};
	margin-bottom: 10px;
	height: 200px;

	&:hover {
		border-color: rgb(129, 131, 132);
	}
`;

const SideBar = styled.div`
	font-size: 20px;
	width: 40px;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
	background-color: transparent;
	color: ${props => props.theme.text};

	i {
		cursor: pointer;
	}
`;

const RightSide = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
	padding: 20px;
	height: 100%;
	font-size: 20px;
`;

const InnerWrapper = styled.div`
	padding: 8px;
	flex-grow: 1;
	max-width: 606px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Header = styled.div`
	font-size: 30px;
	font-weight: 400;
	line-height: 16px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
	padding-top: 20px;
	color: ${props => props.theme.link};
	p{
		font-size: 12px;
		margin-top: 6px;
	}
`;
const Topic = styled.a`
	font-weight: 700;
	color: ${props => props.theme.text};
	padding: 0 5px 0 0;
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	line-height: 22px;
	cursor: pointer;
	color: ${props => props.theme.text};
`;

const DescriptionWrapper = styled.div`
	overflow: hidden;
	word-wrap: break-word;
	word-break: break-word;
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		word-wrap: break-word;
		word-break: break-word;
		color: ${props => props.theme.text};
	}
`;
const FooterWrapper = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
	button {
		width: auto;
		height: 25px;
		white-space: nowrap;
		padding-right: 4px;
		margin-right: 4px;
		text-transform: capitalize;
		overflow-wrap: initial;
		word-break: initial;
		border-radius: 2px;
		transition: background-color 0.1s ease 0s;
		background: transparent;
		border: none;
		color: ${props => props.theme.accentText};
		cursor: pointer;
		padding: initial;
	}
`;

const TakeQuizButton = styled.div`
	border-radius: 4px;
	border: 1px solid;
	border-color: ${props => props.theme.accent};
	display: inline-block;
	padding: 2px;
	margin-top: 5px;
	cursor: pointer;
`;
export const Quiz = ({ quiz, user, handleClick, handleFavoriteToggle, handleVote, mainPage }) => {
	return (
		<QuizWrapper>
			<SideBar>
				<i
					className='pi pi-chevron-up'
					style={{ color: quiz.user_vote === 1 ? 'red' : 'black' }}
					onClick={() => handleVote(1)}
				/>
				<p style={{ color: quiz.user_vote ? 'red' : 'black' }}>{quiz.votes}</p>
				<i
					className='pi pi-chevron-down'
					style={{ color: quiz.user_vote === -1 ? 'red' : 'black' }}
					onClick={() => handleVote(-1)}
				/>
			</SideBar>
			<InnerWrapper>
				<div>
				<Header>
					<div>
						<Topic>{quiz.topic}</Topic>
						<p>Created by {quiz.author.username ? quiz.author.username : quiz.author}</p>
					</div>
				</Header>
				<Title onClick={handleClick}>{quiz.title}</Title>

				{quiz.description && (
					<DescriptionWrapper>
						<p>{quiz.description}</p>
					</DescriptionWrapper>
				)}
				</div>
				
				<FooterWrapper>
					<button>{quiz.question_count} questions</button>
					<button>Share</button>
					<button>Save</button>
				</FooterWrapper>
			</InnerWrapper>
			{user.id && (
						<RightSide>
							<FontAwesomeIcon
								title='Take a bite out of that, Boogin'
								icon={quiz.favorite ? faCookieBite : faCookie}
								color={quiz.favorite ? '#875818' : 'gray'}
								style={{ cursor: 'pointer' }}
								onClick={handleFavoriteToggle}
								
							/>
							<Topic>
								{quiz.score === null ? '--' : quiz.score}/{quiz.question_count}
							</Topic>
						</RightSide>
					)}
		</QuizWrapper>
	);
};