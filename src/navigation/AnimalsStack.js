import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import Animals from '../views/animalsScreens/Animals';
//Roots Import
import ListAnimalStackRoot from './AnimalNavigation/ListAnimalsStack';
const AnimalsStack = createStackNavigator();

export default function AnimalsStackRoot() {
    return (
        <AnimalsStack.Navigator screenOptions={{ headerShown: false }}>
            <AnimalsStack.Screen name='Animals' component={Animals} />
            <AnimalsStack.Screen name='ListAnimalStackRoot' component={ListAnimalStackRoot} />
        </AnimalsStack.Navigator>
    );
}
