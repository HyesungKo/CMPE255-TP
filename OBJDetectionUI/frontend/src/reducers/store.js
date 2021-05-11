/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from './Reducer';

export default configureStore(
  {
    reducer: {
      root: Reducer,
    },
  },
  composeWithDevTools()
);
