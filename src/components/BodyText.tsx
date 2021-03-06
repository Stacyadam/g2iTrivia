import React from 'react';
import { Text } from 'react-native';

interface Props {
	fontSize?: Number;
	h1?: Boolean;
	h2?: Boolean;
	h3?: Boolean;
	style?: any;
}

const BodyText: React.FC<Props> = props => {
	let { fontSize } = props;
	if (props.h1) fontSize = 24;
	if (props.h2) fontSize = 20;
	if (props.h3) fontSize = 18;

	return <Text style={[{ fontSize }, { ...props.style }]}>{props.children}</Text>;
};

BodyText.defaultProps = {
	fontSize: 14
};

export default BodyText;
