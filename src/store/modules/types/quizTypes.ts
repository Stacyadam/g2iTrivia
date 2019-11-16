/*============================================================
== State
/============================================================*/
export interface Question {
	index: number;
	question: String;
	correctAnswer: Boolean;
	pointsScored: number;
	category: String;
}

export interface QuizState {
	questions?: Question[];
	currentQuestion?: Question;
	correct: number;
}

/*============================================================
== Actions
/============================================================*/

export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const RESET = 'RESET';

interface SetQuestionsAction {
	type: typeof SET_QUESTIONS;
	questions: Question[];
}

interface SetCurretionQuestionAction {
	type: typeof SET_CURRENT_QUESTION;
	correct: Boolean;
}

interface ResetAction {
	type: typeof RESET;
}

export type QuizActionTypes = SetQuestionsAction | SetCurretionQuestionAction | ResetAction;
