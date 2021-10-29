import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import RegisterStepOne from '../views/registerScreens/RegisterStepOne';
import RegisterStepTwo from '../views/registerScreens/RegisterStepTwo';

const RegisterStack = createStackNavigator();

export default function RegisterStackRoot() {
    return (
        <RegisterStack.Navigator>
            <RegisterStack.Group screenOptions={{ headerShown: false }}>
                <RegisterStack.Screen name='RegisterStepOneScreen' component={RegisterStepOne}
                    options={{ title: 'Registro Primer Paso' }} />
                <RegisterStack.Screen name='RegisterStepTwoScreen' component={RegisterStepTwo}
                    options={{ title: 'Registro Segundo Paso' }} />
            </RegisterStack.Group>
        </RegisterStack.Navigator>
    );
}