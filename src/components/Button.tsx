import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { BodyText } from '../components';
import Constants from '../config';

interface Props {
	onPress: Function;
	text: string;
	fontSize?: number;
	contentContainerStyle?: object;
	style?: object;
	color?: string;
	loading?: boolean;
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

const Button: React.FC<Props> = ({
	onPress,
	contentContainerStyle,
	text,
	style,
	loading,
	...other
}) => {
	return (
		<TouchableOpacity
			onPress={() => onPress()}
			style={[{ ...DEFAULT_CONTAINER_STYLE }, { ...contentContainerStyle }]}>
			{loading ? (
				<ActivityIndicator size="small" color="#FFF" />
			) : (
				<BodyText style={style} {...other}>
					{text}
				</BodyText>
			)}
		</TouchableOpacity>
	);
};

Button.defaultProps = {
	contentContainerStyle: DEFAULT_CONTAINER_STYLE,
	style: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16
	}
};

export default Button;
