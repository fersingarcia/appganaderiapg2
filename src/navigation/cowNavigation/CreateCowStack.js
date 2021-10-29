import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import CreateCowStepOne from '../../views/animalsScreens/cowScreens/createCowScreens/CreateCowStepOne';
import CreateCowStepTwo from '../../views/animalsScreens/cowScreens/createCowScreens/CreateCowStepTwo';


const CreateCowStack = createStackNavigator();

export default function CreateCowStackRoot() {
    return (
        <CreateCowStack.Navigator screenOptions={{ headerShown: false }}>
            <CreateCowStack.Screen name='CreateCowStepOne' component={CreateCowStepOne} />
            <CreateCowStack.Screen name='CreateCowStepTwo' component={CreateCowStepTwo} />
        </CreateCowStack.Navigator>
    );
}