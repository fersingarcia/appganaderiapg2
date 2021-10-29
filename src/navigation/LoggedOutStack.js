import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import LoggedOut from '../views/loggedOutScreens/LoggedOut';
//Root Screens Import
import RegisterStackRoot from './RegisterStack';
import LoginStackRoot from './LoginStack';

const LoggedOutStack = createStackNavigator();

export default function LoggedOutStackRoot() {
    return (
        <LoggedOutStack.Navigator>
            <LoggedOutStack.Group screenOptions={{ headerShown: false }}>
                <LoggedOutStack.Screen name='LoggedOutScreen' component={LoggedOut} />
                <LoggedOutStack.Screen name='RegisterRoot' component={RegisterStackRoot} />
                <LoggedOutStack.Screen name='LoginRoot' component={LoginStackRoot} />
            </LoggedOutStack.Group>
        </LoggedOutStack.Navigator>
    );
}