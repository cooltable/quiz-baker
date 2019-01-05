import {
	FETCH_ALL_QUIZZES_REQUEST,
	FETCH_ALL_QUIZZES_FAILURE,
	FETCH_ALL_QUIZZES_SUCCESS,
	FETCH_QUIZ_REQUEST,
	FETCH_QUIZ_SUCCESS,
	FETCH_QUIZ_FAILURE,
	UPDATE_USER_SCORE_REQUEST,
	UPDATE_USER_SCORE_FAILURE,
	UPDATE_USER_SCORE_SUCCESS,
	FETCH_TOPICS_REQUEST,
	FETCH_TOPICS_SUCCESS,
	FETCH_TOPICS_FAILURE,
	CREATE_QUIZ_REQUEST,
	CREATE_QUIZ_SUCCESS,
	CREATE_QUIZ_FAILURE,
	FETCH_USER_QUIZ_SUCCESS,
	FETCH_USER_QUIZ_REQUEST,
	FETCH_USER_QUIZ_FAILURE,
	FETCH_ALL_USER_QUIZZES_REQUEST,
	FETCH_ALL_USER_QUIZZES_SUCCESS,
	FETCH_ALL_USER_QUIZZES_FAILURE,
	DELETE_QUIZ_REQUEST,
	DELETE_QUIZ_SUCCESS,
	DELETE_QUIZ_FAILURE,
} from '../actions';

const initialState = {
	quizzes: undefined,
	quiz: undefined,
	loading: false,
	error: undefined,
	topics: undefined,
	newQuizLoading: false,
	newQuiz: undefined,
	edittingQuiz: undefined,
	userQuizzes: undefined,
};

const quizReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case FETCH_ALL_QUIZZES_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
				quiz: undefined,
			};
		case FETCH_ALL_QUIZZES_SUCCESS:
			return {
				...state,
				loading: false,
				quizzes: payload.filter(quiz => quiz.question_count).sort((a, b) => b.id - a.id),
			};
		case FETCH_ALL_QUIZZES_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case FETCH_QUIZ_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_QUIZ_SUCCESS:
			return {
				...state,
				loading: false,
				quiz: payload,
			};
		case FETCH_QUIZ_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case UPDATE_USER_SCORE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UPDATE_USER_SCORE_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case UPDATE_USER_SCORE_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case FETCH_TOPICS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_TOPICS_SUCCESS:
			return {
				...state,
				loading: false,
				topics: payload,
			};
		case FETCH_TOPICS_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case CREATE_QUIZ_REQUEST:
			return {
				...state,
				newQuizloading: true,
			};
		case CREATE_QUIZ_SUCCESS:
			return {
				...state,
				newQuizloading: false,
				newQuiz: payload,
			};
		case CREATE_QUIZ_FAILURE:
			return {
				...state,
				newQuizloading: false,
				error: payload,
			};
		case FETCH_USER_QUIZ_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_USER_QUIZ_SUCCESS:
			return {
				...state,
				loading: false,
				edittingQuiz: payload,
			};
		case FETCH_USER_QUIZ_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case FETCH_ALL_USER_QUIZZES_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_ALL_USER_QUIZZES_SUCCESS:
			return {
				...state,
				loading: false,
				edittingQuiz: undefined,
				userQuizzes: payload.sort((a, b) => b.id - a.id),
			};
		case DELETE_QUIZ_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_QUIZ_SUCCESS:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default quizReducer;
