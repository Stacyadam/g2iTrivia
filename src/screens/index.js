import { Navigation } from 'react-native-navigation';
import WelcomeScreen from './WelcomeScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import { withRedux } from '../redux';

export const startApp = () => {
  Navigation.registerComponent(`g2i.WelcomeScreen`, () =>
    withRedux(WelcomeScreen)
  );
  Navigation.registerComponent(`g2i.QuizScreen`, () => withRedux(QuizScreen));
  Navigation.registerComponent(`g2i.ResultsScreen`, () =>
    withRedux(ResultsScreen)
  );

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
