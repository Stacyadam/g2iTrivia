import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { BodyText } from '../components';
import * as QuizActions from '../store/modules/quiz';

interface Props {
	currentQuestion: {
		index: number;
		category: string;
		question: string;
	};
	componentId: string;
	totalQuestions: number;
	dispatch: Function;
}

const checkAnswer = (answer: boolean, props: any) => {
	const { dispatch, currentQuestion } = props;
	const correct = answer === currentQuestion.correctAnswer;

	dispatch(QuizActions.setCurrentQuestion(correct));
};

const QuizScreen: React.FC<Props> = props => {
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
				<BodyText h1>Quiz</BodyText>
				<BodyText h3>
					{props.currentQuestion.index + 1} of {props.totalQuestions}
				</BodyText>
				<BodyText h3>{props.currentQuestion.category}</BodyText>
				<BodyText h3 style={{ textAlign: 'center' }}>
					{props.currentQuestion.question}
				</BodyText>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity onPress={() => checkAnswer(false, props)}>
						<BodyText>False</BodyText>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => checkAnswer(true, props)}>
						<BodyText>True</BodyText>
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
