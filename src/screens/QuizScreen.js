/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import * as QuizActions from '../store/modules/quiz';

const checkAnswer = (answer, props) => {
	const { dispatch, currentQuestion } = props;
	const correct = answer === currentQuestion.correctAnswer;

	dispatch(QuizActions.setCurrentQuestion(correct));
};

const QuizScreen = props => {
	useEffect(() => {
		if (!props.currentQuestion) {
			Navigation.push(props.componentId, {
				component: {
					name: 'g2i.ResultsScreen'
				}
			});
		}
	}, [props.currentQuestion]);

	if (!props.currentQuestion || !props.totalQuestions) return null;

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<Text>Quiz</Text>
				<Text>
					{props.currentQuestion.index + 1} of {props.totalQuestions}
				</Text>
				<Text>{props.currentQuestion.category}</Text>
				<Text style={{ textAlign: 'center' }}>{props.currentQuestion.question}</Text>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity onPress={() => checkAnswer(false, props)}>
						<Text>False</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => checkAnswer(true, props)}>
						<Text>True</Text>
					</TouchableOpacity>
				</View>
			</View>
			<SafeAreaView />
		</>
	);
};

const styles = StyleSheet.create({});

export default connect(state => ({
	currentQuestion: state.quiz.currentQuestion,
	totalQuestions: state.quiz.questions.length
}))(QuizScreen);
