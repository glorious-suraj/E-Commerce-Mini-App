import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import BottomNavigation from './src/navigation/BottomNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </Provider>
  );
}
