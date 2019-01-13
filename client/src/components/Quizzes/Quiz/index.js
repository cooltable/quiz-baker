import React, { Fragment } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';

import { Wrapper } from '../../Styles/Wrappers/index';
import { FooterWrapper, FooterLink } from '../../Styles/Wrappers/footer';

const QuizWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  height: 180px;
  width: 450px;
  margin: 8px;
  background-color: #fff;
  border-radius: 5px;
  color: #333;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const LeftSide = styled.div`
	font-size: 20px;
	width: 40px;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
	background-color: transparent;
	color: ${props => props.theme.text};
	margin: 0 10px 0 0;

	i {
		cursor: pointer;
	}
`;

const RightSide = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
	height: 100%;
	font-size: 20px;
	svg {
		font-size: 30px;
	}
`;

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Header = styled.div`
	font-weight: 400;
	margin-bottom: 8px;
	color: ${props => props.theme.link};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	p {
		font-size: 12px;
		margin-top: 6px;
	}
	span {
		color: #873d48;
		font-weight: 700;
	}
`;
const Title = styled.a`
	font-size: 24px;
	font-weight: 700;
	padding: 0 5px 0 0;
	color: ${props => props.theme.text};
	cursor: pointer;
`;

const FooterAccent = styled.div`
	font-weight: 500;

	padding: 5px;
	border-radius: 5px;
`;

const Topic = styled(FooterAccent)`
  font-size: 14px;
  color: white;
  background-color: #00ba96;
  margin-right: 10px;

  display: inline-block;
`;

const Score = styled(FooterAccent)`
  font-size: 20px;
  padding: 0;
  color: ${props => (props.noScore ? 'grey' : props.theme.text)};
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

export const QuizzesContainer = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

export const Quiz = ({
	quiz,
	user,
	handleClick,
	handleFavoriteToggle,
	handleVote,
	mainPage,
	handleCopy,
}) => {
	let username = quiz.author.username ? quiz.author.username : quiz.author;
	return (
		<QuizWrapper hasDescription={quiz.description} main={mainPage}>
			<div style={{ display: 'flex' }}>
				<LeftSide>
					<i
						className='pi pi-chevron-up'
						style={{ color: quiz.user_vote === 1 ? '#DC758F' : 'black' }}
						onClick={() => handleVote(1)}
					/>
					<p
						style={{
							color: quiz.user_vote
								? quiz.user_vote === 1 ? '#DC758F' : '#E3D3E4'
								: 'black',
						}}
					>
						{quiz.votes}
					</p>
					<i
						className='pi pi-chevron-down'
						style={{ color: quiz.user_vote === -1 ? '#E3D3E4' : 'black' }}
						onClick={() => handleVote(-1)}
					/>
				</LeftSide>
				<InnerWrapper>
					<div>
						<Header>
							<div>
								<Title onClick={handleClick}>{quiz.title}</Title>
								<p>
									Created by <span>{username}</span>
								</p>
							</div>
						</Header>

						{quiz.description && (
							<DescriptionWrapper>
								<p>
									{quiz.description.length > 70 ? (
										quiz.description.slice(0, 150) + '...'
									) : (
										quiz.description
									)}
								</p>
							</DescriptionWrapper>
						)}
					</div>
					<FooterWrapper>
						<Topic isQuizTopic>{quiz.topic}</Topic>

						<FooterLink onClick={handleCopy}>Share</FooterLink>
					</FooterWrapper>
				</InnerWrapper>
			</div>
			{user && (
				<RightSide>
					<FontAwesomeIcon
						title='Take a bite out of that, Boogin'
						icon={quiz.favorite ? faCookieBite : faCookie}
						color={quiz.favorite ? '#875818' : '#b2b2b2'}
						style={{ cursor: 'pointer' }}
						onClick={handleFavoriteToggle}
					/>
					<Score noScore={quiz.score === null}>
						{quiz.score === null ? '--' : quiz.score}/{quiz.question_count}
					</Score>
				</RightSide>
			)}
		</QuizWrapper>
	);
};
