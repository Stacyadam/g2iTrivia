import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as QuizActions from '../store/modules/quiz';
import { fetchJson } from '../services/ApiService';
import { Navigation } from 'react-native-navigation';

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
	const [data, setData] = useState(null);

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<Text>Welcome</Text>
				<Text>Select Difficulty</Text>
				<TouchableOpacity onPress={() => fetchQuestions('easy', props)}>
					<Text>Easy</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => fetchQuestions('medium', props)}>
					<Text>Medium</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => fetchQuestions('hard', props)}>
					<Text>Hard</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({});

export default connect(state => ({
	test: state.test
}))(WelcomeScreen);
