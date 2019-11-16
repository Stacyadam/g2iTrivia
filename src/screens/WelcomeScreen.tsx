import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import * as QuizActions from '../store/modules/quiz';
import { fetchJson } from '../services/ApiService';
import { Navigation } from 'react-native-navigation';
import { BodyText, Button } from '../components';
import Constants from '../config';

interface Props {
	count: number;
	dispatch: (any: any) => any;
}

const fetchQuestions = async (difficulty: string, props: any) => {
	const { results } = await fetchJson(
		`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=boolean`
	);
	props.dispatch(QuizActions.setQuestions(results));
	Navigation.push(props.componentId, {
		component: {
			name: 'g2i.QuizScreen'
		}
	});
};

const WelcomeScreen: React.FC<Props> = props => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={styles.container}>
				<BodyText h1 style={{ textAlign: 'center', marginBottom: 40 }}>
					Welcome to the Trivia Challenge!
				</BodyText>
				<BodyText h2 style={{ textAlign: 'center', marginBottom: 14 }}>
					You will be presented with 10 true or false questions.
				</BodyText>
				<BodyText h2 style={{ textAlign: 'center', marginBottom: 50 }}>
					Can you score 100%?
				</BodyText>
				<BodyText h3 style={{ textAlign: 'center', marginBottom: 10 }}>
					Choose a difficulty to begin
				</BodyText>
				<Button
					onPress={() => fetchQuestions('easy', props)}
					text="Easy"
					contentContainerStyle={{
						backgroundColor: Constants.colors.green,
						marginBottom: 10
					}}
				/>
				<Button
					onPress={() => fetchQuestions('medium', props)}
					text="Medium"
					contentContainerStyle={{ marginBottom: 10 }}
				/>
				<Button
					onPress={() => fetchQuestions('hard', props)}
					text="Hard"
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

export default connect(state => ({
	test: state.test
}))(WelcomeScreen);
