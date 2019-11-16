import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { BodyText, Button } from '../components';
import * as QuizActions from '../store/modules/quiz';
import { QuizState } from '../store/modules/types/quizTypes';
import Constants from '../config';

interface Props {
	componentId: string;
	quiz: QuizState;
	dispatch: Function;
}

const checkAnswer = (answer: boolean, props: any) => {
	const { dispatch, quiz } = props;
	const correct = answer === quiz.currentQuestion.correctAnswer;

	const setCurrentQuestion = () => dispatch(QuizActions.setCurrentQuestion(correct));

	Navigation.showModal({
		component: {
			name: 'g2i.AnswerModal',
			passProps: {
				correct,
				setCurrentQuestion
			}
		}
	});
};

const QuizScreen: React.FC<Props> = props => {
	useEffect(() => {
		if (!props.quiz.currentQuestion) {
			Navigation.push(props.componentId, {
				component: {
					name: 'g2i.ResultsScreen'
				}
			});
		}
	}, [props.quiz.currentQuestion]);

	if (!props.quiz || !props.quiz.questions || !props.quiz.currentQuestion) return null;
	const { currentQuestion, questions } = props.quiz;

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<BodyText h1 style={{ fontWeight: 'bold' }}>
						Quiz
					</BodyText>
					<BodyText h4 style={{ marginBottom: 20 }}>
						({currentQuestion.index + 1} of {questions.length})
					</BodyText>
				</View>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						paddingHorizontal: 40,
						marginTop: -100
					}}>
					<BodyText
						h1
						style={{
							marginBottom: 10,
							fontWeight: 'bold',
							textAlign: 'center',
							textDecorationLine: 'underline'
						}}>
						{currentQuestion.category}
					</BodyText>
					<BodyText h2 style={{ textAlign: 'center' }}>
						{currentQuestion.question}
					</BodyText>

					<View
						style={{
							position: 'absolute',
							bottom: 40,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: 350
						}}>
						<Button
							onPress={() => checkAnswer(false, props)}
							text="False"
							fontSize={24}
							contentContainerStyle={{
								backgroundColor: Constants.colors.red,
								width: 160
							}}
						/>
						<Button
							onPress={() => checkAnswer(true, props)}
							text="True"
							fontSize={24}
							contentContainerStyle={{
								backgroundColor: Constants.colors.green,
								width: 160
							}}
						/>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({});

export default connect(state => ({
	quiz: state.quiz
}))(QuizScreen);
