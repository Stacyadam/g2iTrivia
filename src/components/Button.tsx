import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BodyText } from '../components';
import Constants from '../config';

interface Props {
	onPress: Function;
	text: string;
	fontSize?: number;
	contentContainerStyle?: object;
	style?: object;
	color?: string;
	other?: any;
}

const DEFAULT_CONTAINER_STYLE = {
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: Constants.colors.blue,
	borderRadius: 30,
	padding: 14,
	width: '80%'
};

const Button: React.FC<Props> = ({ onPress, contentContainerStyle, text, style, ...other }) => {
	return (
		<TouchableOpacity
			onPress={() => onPress()}
			style={[{ ...DEFAULT_CONTAINER_STYLE }, { ...contentContainerStyle }]}>
			<BodyText {...other} style={style}>
				{text}
			</BodyText>
		</TouchableOpacity>
	);
};

Button.defaultProps = {
	contentContainerStyle: DEFAULT_CONTAINER_STYLE,
	style: {
		color: '#FFF',
		fontWeight: 'bold'
	}
};

export default Button;
