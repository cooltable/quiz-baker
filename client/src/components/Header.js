import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { InputSwitch } from 'primereact/inputswitch';

import { fetchPosts } from '../store/actions/forumActions';
import { logout } from '../store/actions/authActions';

const HeaderWrapper = styled.div`
	height: 70px;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.secondary};
	padding: 0 10px;
	top: 0;
	left: 0;
	width: 100%;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .3);
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.text};
`;

const StyledMenu = styled(Menubar)`
	position: fixed;
	background-color: ${props => props.theme.secondary} !important;
	border-color: ${props => props.theme.accent} !important;
  top: 70px;
  width: 100%;
	a, span {
		background-color: ${props => props.theme.secondary} !important;
		color: ${props => props.theme.text} !important;
	}
	ul {
		border-color: ${props => props.theme.accent} !important;
	}
`;
const Header = ({ user, setValue, darkMode, ...props }) => {
	console.log(user);
	const AuthItems = [
		{
			label: 'Home',
			icon: 'pi pi-home',
			command: () => {
				props.history.push('/');
			},
		},
		{
			label: 'Quizzes',
			items: [
				{
					label: 'Your quizzes',
				},
				{
					label: 'Favorites',
				},
			],
		},
		{
			label: 'Forum',
			command: () => {
				props.fetchPosts();
				props.history.push('/forum');
			},
		},
		{
			label: user && user.username,
			items: [
				{
					label: 'Settings',
				},
				{
					separator: true,
				},
				{
					label: 'Logout',
					command: () => {
						props.logout();
					},
				},
			],
		},
	];
	const NoAuthItems = [
		{
			label: 'Home',
			icon: 'pi pi-home',
			command: () => {
				props.history.push('/');
			},
		},
		{
			label: 'Quizzes',
		},
		{
			label: 'Forum',
			command: () => {
				props.fetchPosts();
				props.history.push('/forum');
			},
		},
		{
			label: 'Join us',
			items: [
				{
					label: 'Login',
					command: () => {
						props.history.push('/login');
					},
				},
				{
					label: 'Register',
					command: () => {
						props.history.push('/register');
					},
				},
			],
		},
	];
	return (
		<Fragment>
			<HeaderWrapper>
				<StyledLink to='/'>Quiz Thang</StyledLink>
				<InputSwitch
					onLabel='Dark Mode'
					offLabel='Light Mode'
					checked={darkMode}
					onChange={e => setValue(e.value)}
				/>
			</HeaderWrapper>
			<StyledMenu model={user ? AuthItems : NoAuthItems} />
		</Fragment>
	);
};

export default withRouter(connect(null, { logout, fetchPosts })(Header));
