import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	StatusBar,
	FlatList,
	TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import * as QuizActions from '../store/modules/quiz';
import { QuizState } from 'src/store/modules/types/quizTypes';

interface Props {
	questions: QuizState['questions'];
	correct: QuizState['correct'];
	dispatch: (any: any) => any;
}

const playAgain = (props: any) => {
	Navigation.popToRoot(props.componentId);
	props.dispatch(QuizActions.reset());
};

const ResultsScreen: React.FC<Props> = props => {
	if (!props.questions || !props.correct) return null;
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<Text>
					You scored {props.correct} / {props.questions.length}
				</Text>
				<FlatList
					data={props.questions}
					keyExtractor={item => item.index.toString()}
					renderItem={({ item }) => (
						<View style={{ flexDirection: 'row' }}>
							<Text>{item.pointsScored > 0 ? '+' : '-'}</Text>
							<Text>{item.question}</Text>
						</View>
					)}
				/>
				<TouchableOpacity onPress={() => playAgain(props)}>
					<Text>PLAY AGAIN?</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({});

export default connect(state => ({
	questions: state.quiz.questions,
	correct: state.quiz.correct
}))(ResultsScreen);
