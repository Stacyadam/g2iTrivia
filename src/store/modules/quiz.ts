import { decode } from 'he';
import {
	Question,
	SET_QUESTIONS,
	SET_CURRENT_QUESTION,
	QuizActionTypes,
	QuizState
} from './types/quizTypes';

/*============================================================
== Action Creators
/============================================================*/

export function setQuestions(questions: Question[]): QuizActionTypes {
	return { type: SET_QUESTIONS, questions };
}

export function setCurrentQuestion(correct: Boolean): QuizActionTypes {
	return { type: SET_CURRENT_QUESTION, correct };
}

/*============================================================
== Initial State
/============================================================*/

const initialState: QuizState = {
	questions: [],
	currentQuestion: {
		question: '',
		index: 0,
		category: '',
		correctAnswer: false,
		pointsScored: 0
	},
	correct: 0
};

/*============================================================
== Reducer
/============================================================*/

export default function quiz(state = initialState, action: QuizActionTypes): QuizState {
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
