import { decode } from 'he';
/*============================================================
== Constants
/============================================================*/

const SET_QUESTIONS = 'SET_QUESTIONS';
const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';

/*============================================================
== Action Creators
/============================================================*/

export function setQuestions(questions) {
	return { type: SET_QUESTIONS, questions };
}

export function setCurrentQuestion(correct) {
	return { type: SET_CURRENT_QUESTION, correct };
}

/*============================================================
== Initial State
/============================================================*/

const initialState = {
	questions: null,
	currentQuestion: null,
	correct: 0
};

/*============================================================
== Reducer
/============================================================*/

export default function quiz(state = initialState, action) {
	switch (action.type) {
		case SET_QUESTIONS:
			const questions = action.questions.map(
				(
					{ type, difficulty, incorrect_answers, correct_answer, question, ...rest },
					index
				) => {
					return {
						index,
						question: decode(question),
						correctAnswer: correct_answer === 'True',
						pointsScored: 0,
						...rest
					};
				}
			);

			return {
				...state,
				questions,
				currentQuestion: questions[0]
			};

		case SET_CURRENT_QUESTION: {
			const currentQuestion = state.questions[state.currentQuestion.index + 1];
			let questions = state.questions;
			if (action.correct) {
				questions = state.questions.map(x => {
					if (x.index === state.currentQuestion.index) {
						return {
							...x,
							pointsScored: 1
						};
					} else {
						return x;
					}
				});
			}

			return {
				...state,
				questions,
				currentQuestion,
				correct: action.correct ? state.correct + 1 : state.correct
			};
		}

		default:
			return state;
	}
}
