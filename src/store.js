import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducers";

const logMiddleware = store => dispatch => action => {
  console.log(action.type, store.getState());

  return dispatch(action);
};

const strMiddleware = () => next => action => {
  if (typeof action === 'string') {
    return next({
      type: action
    });
  }

  return next(action);
};

const store = createStore(reducer, applyMiddleware(
  thunkMiddleware, strMiddleware, logMiddleware));

// IN THUNK

const myAction = (dispatch) => {
  setTimeout(() => dispatch({
      type: 'DELATED_ACTION'
    }), 5000);
};

store.dispatch(myAction);

const delayActionCreator = (time) => (dispatch) => {
  setTimeout(() => dispatch({
    type: 'DELATED_ACTION'
  }), time);
};

store.dispatch(delayActionCreator(3000));

// use enhancer
//
// const strEnhancer = createStore => (...args) => {
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     if (typeof action === 'string') {
//       return originalDispatch({
//         type: action
//       });
//     }
//
//     return originalDispatch(action);
//   };
//
//   return store;
// };
//
// const logEnhancer = createStore => (...args) => {
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     console.log(action.type);
//
//     return originalDispatch(action);
//   };
//
//   return store;
// };

// const store = createStore(reducer, compose(strEnhancer, logEnhancer));

// manky patching
//
// const originalDispath = store.dispatch;
// store.dispatch = (action) => {
//
//   if (typeof action === 'string') {
//     return originalDispath({
//       type: action
//     });
//   }
//
//   return originalDispath(action);
// }



store.dispatch('HELLO_WORLD');

export default store;