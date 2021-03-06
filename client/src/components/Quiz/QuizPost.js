import React, { useState, useEffect, useContext } from 'react';
import { UserCtx } from '../../App';
import moment from 'moment';
import { QuizPostCtx, QuestionCtx } from '../../containers/Quiz';
import server from '../../utils/server';
import {
	PostWrapper,
	BodyWrapper,
	Header,
	FooterWrapper,
	CommentCount,
	Title,
	InnerWrapper,
	LeftSide,
} from '../../Styles/Posts/Post';
import { ProfileIcon } from '../../Styles/Components/Image';
import PostComments from './PostComments';

const Post = ({ post }) => {
	const [ showingComments, setShowingComments ] = useState(false);
	const [ user, setUser ] = useContext(UserCtx);
	const [ quizPosts, setQuizPosts ] = useContext(QuizPostCtx);
	console.log(post);

	const handleVote = val => {
		console.log(post.user_vote, val);
		if (user) {
			let user_vote;
			if (val === post.user_vote) {
				user_vote = 0;
			} else {
				user_vote = val;
			}
			console.log(user_vote);
			server
				.patch(`posts/${post.id}/vote`, { vote: user_vote })
				.then(({ data }) => {
					server.get(`/quizzes/${post.quiz}/posts`).then(({ data }) => {
						setQuizPosts(data.sort((a, b) => b.id - a.id));
					});
				})
				.catch(err => console.log(err));
		}
	};
	return (
		<div>
			<PostWrapper>
				<InnerWrapper>
					<Header>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<ProfileIcon src={post.author_img} />
							Posted by <a>{post.author}</a>
							<span style={{ padding: '0 3px' }}>&#8226;</span>
							{moment(post.created_at).fromNow()}
						</div>
					</Header>
					<div className='body'>
						<LeftSide user={user} quiz>
							<i
								className='pi pi-chevron-up'
								style={{
									color:
										post.user_vote === 1 ? '#DC758F' : !user ? 'gray' : 'black',
								}}
								onClick={() => handleVote(1)}
							/>
							<p
								style={{
									color: post.user_vote
										? post.user_vote === 1 ? '#DC758F' : '#E3D3E4'
										: 'black',
								}}
							>
								{post.votes}
							</p>
							<i
								className='pi pi-chevron-down'
								style={{
									color:
										post.user_vote === -1
											? '#E3D3E4'
											: !user ? 'gray' : 'black',
								}}
								onClick={() => handleVote(-1)}
							/>
						</LeftSide>
						<div>
							<BodyWrapper quiz>
								<Title>{post.title}</Title>

								<p>{post.body}</p>
							</BodyWrapper>

							<FooterWrapper>
								<CommentCount
									style={{ cursor: 'pointer' }}
									onClick={() => setShowingComments(!showingComments)}
								>
									{post.comment_count === 1 ? (
										'1 comment'
									) : (
										`${post.comment_count} comments`
									)}
								</CommentCount>
								<i
									className={
										showingComments ? 'pi pi-angle-down' : 'pi pi-angle-left'
									}
									onClick={() => setShowingComments(!showingComments)}
								/>
							</FooterWrapper>
						</div>
					</div>
				</InnerWrapper>
			</PostWrapper>
			{showingComments && <PostComments post={post} />}
		</div>
	);
};

export default Post;
