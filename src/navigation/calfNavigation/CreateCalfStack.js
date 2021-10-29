import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import CreateCalfStepOne from '../../views/animalsScreens/calfScreens/createCalfScreens/createCalfStepOne';
import CreateCalfStepTwo from '../../views/animalsScreens/calfScreens/createCalfScreens/createCalfStepTwo';

const CreateCalfStack = createStackNavigator();

export default function CreateCalfStackRoot() {
    return (
        <CreateCalfStack.Navigator screenOptions={{ headerShown: false }}>
            <CreateCalfStack.Screen name='CreateCalfStepOne' component={CreateCalfStepOne} />
            <CreateCalfStack.Screen name='CreateCalfStepTwo' component={CreateCalfStepTwo} />
        </CreateCalfStack.Navigator>
    );
}