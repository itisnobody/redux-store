import { createStore, compose } from "redux";

import reducer from "./reducers";

const strEnhancer = createStore => (...args) => {
  const store = createStore(...args);
  const originalDispatch = store.dispatch;
  store.dispatch = (action) => {
    if (typeof action === 'string') {
      return originalDispatch({
        type: action
      });
    }

    return originalDispatch(action);
  };

  return store;
};

const logEnhancer = createStore => (...args) => {
  const store = createStore(...args);
  const originalDispatch = store.dispatch;
  store.dispatch = (action) => {
    console.log(action.type);

    return originalDispatch(action);
  };

  return store;
};

const store = createStore(reducer, compose(strEnhancer, logEnhancer));

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