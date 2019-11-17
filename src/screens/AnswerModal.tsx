import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { BodyText } from '../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from '../config';

interface Props {
	correct: Boolean;
	setCurrentQuestion: Function;
	componentId: string;
}

const AnswerModal: React.FC<Props> = props => {
	const [correctObj, setCorrectObj] = useState({
		color: Constants.colors.green,
		copy: '',
		Icon: <Icon name="check" size={60} color={Constants.colors.green} />
	});

	useEffect(() => {
		const { correct } = props;
		setCorrectObj({
			color: correct ? Constants.colors.green : Constants.colors.red,
			copy: correct ? 'CORRECT' : 'WRONG',
			Icon: correct ? (
				<Icon name="check" size={60} color={Constants.colors.green} />
			) : (
				<Icon name="times" size={60} color={Constants.colors.red} />
			)
		});
		setTimeout(() => {
			props.setCurrentQuestion();
			Navigation.dismissModal(props.componentId);
		}, 1000);
	}, []);

	return (
		<>
			<View style={styles.wrapper}>
				<BodyText h1 style={{ fontSize: 40, color: correctObj.color }}>
					{correctObj.copy}
				</BodyText>
				{correctObj.Icon}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default AnswerModal;
