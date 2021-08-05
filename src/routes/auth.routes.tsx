import React from 'react';
import {SingIn} from '../screens/SignIn';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return(
    <Navigator >
      <Screen  name="SingIn" component={SingIn}/>
    </Navigator>
  )
}