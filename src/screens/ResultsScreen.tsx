import React from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, FlatList } from 'react-native';
import { BodyText, Button } from '../components';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import * as QuizActions from '../store/modules/quiz';
import { QuizState } from 'src/store/modules/types/quizTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from '../config';

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
			<SafeAreaView style={styles.wrapper}>
				<BodyText h1 style={{ fontWeight: 'bold' }}>
					You scored {props.correct} / {props.questions.length}
				</BodyText>
				<FlatList
					data={props.questions}
					keyExtractor={item => item.index.toString()}
					contentContainerStyle={styles.listContainer}
					renderItem={({ item }) => (
						<View style={{ flexDirection: 'row', marginBottom: 10 }}>
							{item.pointsScored > 0 ? (
								<Icon
									name="check"
									size={30}
									color={Constants.colors.green}
									style={{ marginRight: 10, marginLeft: -5 }}
								/>
							) : (
								<Icon
									name="times"
									size={30}
									color={Constants.colors.red}
									style={{ marginRight: 10 }}
								/>
							)}
							<BodyText h2 style={{ paddingRight: 80 }}>
								{item.question}
							</BodyText>
						</View>
					)}
				/>
				<View style={styles.buttonContainer}>
					<Button onPress={() => playAgain(props)} text="PLAY AGAIN?" />
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	listContainer: {
		padding: 20,
		paddingHorizontal: 30
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 10,
		left: 0,
		right: 0,
		alignItems: 'center'
	}
});

export default connect(state => ({
	questions: state.quiz.questions,
	correct: state.quiz.correct
}))(ResultsScreen);
