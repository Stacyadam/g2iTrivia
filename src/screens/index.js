import { Navigation } from 'react-native-navigation';
import WelcomeScreen from './WelcomeScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';

export const startApp = () => {
  Navigation.registerComponent(`g2i.WelcomeScreen`, () => WelcomeScreen);
  Navigation.registerComponent(`g2i.QuizScreen`, () => QuizScreen);
  Navigation.registerComponent(`g2i.ResultsScreen`, () => ResultsScreen);

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'g2i.ResultsScreen'
        },
        component: {
          name: 'g2i.QuizScreen'
        },
        component: {
          name: 'g2i.WelcomeScreen'
        }
      }
    });
  });
};
