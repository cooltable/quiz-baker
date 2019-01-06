import axios from 'axios';

import * as actions from './index';
import { checkUser } from './authActions';

let URL = 'https://lambda-study-app.herokuapp.com/api/quizzes';

export const fetchQuizQuestions = id => async (dispatch, getState) => {
	dispatch({ type: actions.FETCH_QUIZ_QUESTIONS_REQUEST });
	await checkUser();
	axios({
		method: 'get',
		url: `${URL}/${id}/questions`,
		headers: {
			authorization: getState().authReducer.token,
		},
	})
		.then(({ data }) => {
			dispatch({ type: actions.FETCH_QUIZ_QUESTIONS_SUCCESS, payload: data });
		})
		.catch(({ response }) => {
			console.log(response);
			dispatch({
				type: actions.FETCH_QUIZ_QUESTIONS_FAILURE,
				payload: response,
			});
		});
};

export const editQuestion = (question, id) => (dispatch, getState) => {
	dispatch({ type: actions.EDIT_QUESTION_REQUEST });
	let quizId = getState().quizReducer.edittingQuiz.id;
	console.log(question, id);
	axios({
		method: 'patch',
		url: `${URL}/${quizId}/questions/${id}`,
		headers: {
			authorization: getState().authReducer.token,
		},
		data: question,
	})
		.then(({ data }) => {
			dispatch({ type: actions.EDIT_QUESTION_SUCCESS });
			dispatch(fetchQuizQuestions(quizId));
		})
		.catch(({ response }) => {
			dispatch({ type: actions.EDIT_QUESTION_FAILURE, payload: response.data.message });
		});
};

export const fetchQuestion = id => (dispatch, getState) => {
	dispatch({ type: actions.FETCH_QUESTION_REQUEST });
	dispatch(fetchQuizQuestions(id)).then(() => {
		console.log(getState().quizReducer.quiz, getState().questionReducer.questions[0]);
	});
};
