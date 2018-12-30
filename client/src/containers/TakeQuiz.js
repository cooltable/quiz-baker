import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { fetchQuiz } from '../store/actions/quizActions';
import { fetchQuizQuestions } from '../store/actions/questionActions';
import { Quiz as QuizWrapper } from '../components/Quizzes/Quiz';
import { QuestionTracker } from '../components/Quizzes/Questions/QuestionTracker';
import { Button } from '../components/Quizzes/button';
import { Results } from '../components/Quizzes/Quiz/results';
import Question from './Question';

const Quiz = ({ quiz, loading, questions, fetchQuiz, fetchQuizQuestions, ...props }) => {
	useEffect(() => {
		fetchQuiz(props.match.params.id);
		fetchQuizQuestions(props.match.params.id);
	}, []);

	useEffect(
		() => {
			if (questions) {
				setQuestionResponse(_.fill(Array(questions.length), { correct: null }));
			}
		},
		[ questions ],
	);

	const [ questionResponse, setQuestionResponse ] = useState(null);

	const [ currentQuestion, setQuestion ] = useState(null);

	const checkAnswer = option => {
		axios({
			method: 'get',
			url: `https://lambda-study-app.herokuapp.com/api/quizzes/${quiz.id}/questions/${questions[
				currentQuestion
			].id}/response`,
			params: {
				option,
			},
		})
			.then(({ data }) => {
				let newQuestions = [ ...questionResponse ];
				newQuestions[currentQuestion] = {
					correct: data.correct,
					question: questions[currentQuestion],
					option: questions[currentQuestion].options[option],
				};
				setQuestionResponse(newQuestions);
				setQuestion(currentQuestion + 1);
			})
			.catch(err => console.log(err));
	};

	if (quiz)
		return (
			<Fragment>
				{currentQuestion === null ? (
					<QuizWrapper quiz={quiz} />
				) : currentQuestion === questions.length ? (
					<Results />
				) : (
					<Question
						quiz={quiz}
						question={questions[currentQuestion]}
						checkAnswer={checkAnswer}
					/>
				)}
				{currentQuestion === null && (
					<Button
						currentQuestion={currentQuestion}
						text='Next Question'
						handleClick={() => setQuestion(0)}
					/>
				)}
				<QuestionTracker questions={questionResponse} currentQuestion={currentQuestion} />
			</Fragment>
		);
	else return <div>Loading...</div>;
};

const mapStateToProps = ({ quizReducer, questionReducer }) => ({
	quiz: quizReducer.quiz,
	loading: quizReducer.loading,
	questions: questionReducer.questions,
});

export default connect(mapStateToProps, { fetchQuiz, fetchQuizQuestions })(Quiz);
