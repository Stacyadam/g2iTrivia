import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import * as QuizActions from '../store/modules/quiz';
import { fetchJson } from '../services/ApiService';
import { Navigation } from 'react-native-navigation';
import { BodyText, Button } from '../components';
import Constants from '../config';

interface Props {
	count: number;
	dispatch: (any: any) => any;
}

//DIFFICULTY OPTIONS
const DIFFICULTY = {
	EASY: 'easy',
	MEDIUM: 'medium',
	HARD: 'hard'
};

const WelcomeScreen: React.FC<Props> = props => {
	const [loading, setLoading] = useState('');

	const fetchQuestions = async (difficulty: string, props: any) => {
		setLoading(difficulty);
		const { results } = await fetchJson(
			`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=boolean`
		);
		setLoading('');
		props.dispatch(QuizActions.setQuestions(results));
		Navigation.push(props.componentId, {
			component: {
				name: 'g2i.QuizScreen'
			}
		});
	};

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={styles.container}>
				<BodyText h1 style={{ textAlign: 'center', marginBottom: 40, fontWeight: 'bold' }}>
					Welcome to the Trivia Challenge!
				</BodyText>
				<BodyText h2 style={{ textAlign: 'center', marginBottom: 14 }}>
					You will be presented with 10 true or false questions.
				</BodyText>
				<BodyText h2 style={{ textAlign: 'center', marginBottom: 50 }}>
					Can you score 100%?
				</BodyText>
				<BodyText h3 style={{ textAlign: 'center', marginBottom: 16, fontWeight: 'bold' }}>
					Choose a difficulty to begin
				</BodyText>
				<Button
					onPress={() => fetchQuestions(DIFFICULTY.EASY, props)}
					text="Easy"
					fontSize={18}
					loading={loading === DIFFICULTY.EASY}
					contentContainerStyle={{
						backgroundColor: Constants.colors.green,
						marginBottom: 10
					}}
				/>
				<Button
					onPress={() => fetchQuestions(DIFFICULTY.MEDIUM, props)}
					text="Medium"
					fontSize={18}
					loading={loading === DIFFICULTY.MEDIUM}
					contentContainerStyle={{ marginBottom: 10 }}
				/>
				<Button
					onPress={() => fetchQuestions(DIFFICULTY.HARD, props)}
					text="Hard"
					fontSize={18}
					loading={loading === DIFFICULTY.HARD}
					contentContainerStyle={{ backgroundColor: Constants.colors.red }}
				/>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20
	}
});

export default connect(null)(WelcomeScreen);
