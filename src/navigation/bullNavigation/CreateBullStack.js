import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import CreateBullStepOne from '../../views/animalsScreens/bullScreens/createBullScreens/CreateBullStepOne';
import CreateBullStepTwo from '../../views/animalsScreens/bullScreens/createBullScreens/CreateBullStepTwo';

const CreateBullStack = createStackNavigator();

export default function CreateBullStackRoot() {
    return (
        <CreateBullStack.Navigator screenOptions={{ headerShown: false }}>
            <CreateBullStack.Screen name='CreateBullStepOne' component={CreateBullStepOne} />
            <CreateBullStack.Screen name='CreateBullStepTwo' component={CreateBullStepTwo} />
        </CreateBullStack.Navigator>
    );
}