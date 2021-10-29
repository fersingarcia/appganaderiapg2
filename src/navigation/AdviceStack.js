import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import Advices from '../views/advicesScreens/Advices';


const AdviceStack = createStackNavigator();

export default function AdviceStackRoot() {
    return (
        <AdviceStack.Navigator screenOptions={{ headerShown: false }}>
            <AdviceStack.Screen name='Advices' component={Advices} />
        </AdviceStack.Navigator>
    );
}
