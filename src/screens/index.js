import { Navigation } from 'react-native-navigation';
import WelcomeScreen from './WelcomeScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import { withRedux } from '../store';

export const startApp = () => {
	Navigation.registerComponent('g2i.WelcomeScreen', () => withRedux(WelcomeScreen));
	Navigation.registerComponent('g2i.QuizScreen', () => withRedux(QuizScreen));
	Navigation.registerComponent('g2i.ResultsScreen', () => withRedux(ResultsScreen));

	Navigation.events().registerAppLaunchedListener(() => {
		Navigation.setRoot({
			root: {
				stack: {
					options: {
						topBar: {
							visible: false
						}
					},
					children: [
						{
							component: {
								name: 'g2i.WelcomeScreen'
							}
						}
					]
				}
			}
		});
	});
};
