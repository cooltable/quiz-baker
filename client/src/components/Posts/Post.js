import React, { useEffect, useContext } from 'react';
import { PostsCtx } from '../../pages/Forum';
import moment from 'moment';
import { UserCtx } from '../../App';
import { Growl } from 'primereact/growl';
import server from '../../utils/server';
import hatIcon from '../../assets/chef.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCookie } from '@fortawesome/free-solid-svg-icons';
import {
	PostWrapper,
	BodyWrapper,
	Header,
	FooterWrapper,
	CommentCount,
	Title,
	InnerWrapper,
	Topic,
	LeftSide,
	HatWrapper,
} from '../../Styles/Posts/Post';
import { ProfileIcon } from '../../Styles/Components/Image';

const Post = ({ post, showComments, ...props }) => {
	const [ posts, setPosts ] = useContext(PostsCtx);
	const [ user, setUser ] = useContext(UserCtx);
	const growl = React.createRef();
	const handleCopy = () => {
		let value = `http://localhost:3000/forum/${post.id}`;
		navigator.clipboard.writeText(value).then(() => {
			growl.current.show({ severity: 'info', summary: 'Link Copied!' });
		});
	};

	const handleFavoriteToggle = () => {
		server
			.patch(`posts/${post.id}/vote`, { favorite: !post.favorite })
			.then(({ data }) => {
				server.get('/posts').then(({ data }) => {
					setPosts(data.sort((a, b) => b.id - a.id));
				});
			})
			.catch(err => console.log(err));
	};

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
					server.get('/posts').then(({ data }) => {
						setPosts(data.sort((a, b) => b.id - a.id));
					});
				})
				.catch(err => console.log(err));
		}
	};
	return (
		<PostWrapper userPage={props.history.location.pathname === '/user/settings'}>
			{user && user.username === post.author && <HatWrapper src={hatIcon} />}
			<Growl ref={growl} />
			<LeftSide user={user}>
				<i
					className='pi pi-chevron-up'
					style={{
						color: post.user_vote === 1 ? '#DC758F' : !user ? 'gray' : 'black',
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
						color: post.user_vote === -1 ? '#E3D3E4' : !user ? 'gray' : 'black',
					}}
					onClick={() => handleVote(-1)}
				/>
			</LeftSide>
			<InnerWrapper>
				<Header>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<ProfileIcon src={post.author_img} />
						Posted by <a>{post.author}</a>
						<span style={{ padding: '0 3px' }}>&#8226;</span>
						{moment(post.created_at).fromNow()}
					</div>
					{post.topic && <Topic>{post.topic}</Topic>}
				</Header>
				<BodyWrapper onClick={() => props.history.push(`/forum/${post.id}`)}>
					<Title>{post.title}</Title>

					<p>{post.body}</p>
				</BodyWrapper>

				<FooterWrapper>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<CommentCount>
							{post.comment_count === 1 ? (
								'1 comment'
							) : (
								`${post.comment_count} comments`
							)}
						</CommentCount>
						{post.comment_count > 0 && (
							<i className='pi pi-eye' onClick={showComments} />
						)}
						<i className='pi pi-share-alt' onClick={handleCopy} />
						{user ? (
							<FontAwesomeIcon
								title='Take a bite out of that, Boogin'
								icon={post.favorite ? faCookieBite : faCookie}
								color={post.favorite ? '#875818' : '#b2b2b2'}
								style={{ cursor: 'pointer' }}
								onClick={handleFavoriteToggle}
							/>
						) : (
							<div />
						)}
					</div>
				</FooterWrapper>
			</InnerWrapper>
		</PostWrapper>
	);
};

export default Post;
