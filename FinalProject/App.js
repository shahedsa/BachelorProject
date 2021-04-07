import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
//import {AppLoading} from 'expo';
//import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './frontend/src/navigation/AppNavigator';

import authReducer from './frontend/src/store/reducers/auth';

import StartupScreen from './frontend/src/screens/StartupScreen';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
//   });
// };

export default function App() {
  //const [fontLoaded, setFontLoaded] = useState(false);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => {
  //         setFontLoaded(true);
  //       }}
  //     />
  //   );
  // }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
