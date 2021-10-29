import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import Home from '../views/home/Home';


const HomeStack = createStackNavigator();

export default function HomeStackRoot() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='Home' component={Home} />
        </HomeStack.Navigator>
    );
}
