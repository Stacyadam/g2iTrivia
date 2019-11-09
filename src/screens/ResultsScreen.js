import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	FlatList,
	TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import * as QuizActions from '../store/modules/quiz';

const playAgain = props => {
	Navigation.popToRoot(props.componentId);
};

const ResultsScreen = props => {
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
