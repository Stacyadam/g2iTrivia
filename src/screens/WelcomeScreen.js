import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import * as QuizActions from '../redux/modules/quiz';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const WelcomeScreen = props => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => props.dispatch(QuizActions.testAction('test'))}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text>Welcome</Text>
      </TouchableOpacity>
      <SafeAreaView />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }
});

export default connect(state => ({
  test: state.test
}))(WelcomeScreen);
