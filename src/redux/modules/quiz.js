/*============================================================
== Constants
/============================================================*/

const TEST_ACTION = 'TEST_ACTION';

/*============================================================
== Action Creators
/============================================================*/

export function testAction(test) {
  return { type: TEST_ACTION, test };
}

/*============================================================
== Initial State
/============================================================*/

const initialState = {};

/*============================================================
== Reducer
/============================================================*/

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case TEST_ACTION:
      return {
        ...state,
        quiz: action.test
      };

    default:
      return state;
  }
}
