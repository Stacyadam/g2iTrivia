import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { BodyText, Button } from '../components';

interface Props {
	dispatch: Function;
}

const AnswerModal: React.FC<Props> = props => {
	useEffect(() => {
		setTimeout(() => {
			props.setCurrentQuestion();
			Navigation.dismissModal(props.componentId);
		}, 1000);
	}, []);

	return (
		<>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<BodyText h1 style={{ color: 'black' }}>
					{props.correct ? 'CORRECT' : 'WRONG'}
				</BodyText>
			</View>
		</>
	);
};

const styles = StyleSheet.create({});

export default AnswerModal;
