import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import Login from '../views/loginScreens/Login';
//Root Screens Import
import ForgotPasswordRoot from './ForgotPasswordStack';

const LoginStack = createStackNavigator();

export default function LoginStackRoot() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Group screenOptions={{ headerShown: false }}>
                <LoginStack.Screen name='Login' component={Login} />
                <LoginStack.Screen name='ForgotPassword' component={ForgotPasswordRoot} />
            </LoginStack.Group>
        </LoginStack.Navigator>
    );
}