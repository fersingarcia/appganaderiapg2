import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import ForgotPassword from '../views/forgotPasswordScreens/ForgotPassword';
import EnterCode from '../views/forgotPasswordScreens/EnterCode';
import ResetPassword from '../views/forgotPasswordScreens/ResetPassword';

const ForgotPasswordStack = createStackNavigator();

export default function ForgotPasswordRoot() {
    return (
        <ForgotPasswordStack.Navigator>
            <ForgotPasswordStack.Screen name='ForgotPasswordScreen' component={ForgotPassword}
                options={{
                    title: 'Recuperar Clave'
                }}
            />
            <ForgotPasswordStack.Screen name='EnterCode' component={EnterCode}
                options={{
                    title: 'Ingresar Codigo'
                }}
            />
            <ForgotPasswordStack.Screen name='ResetPassword' component={ResetPassword}
                options={{
                    title: 'Nueva Clave'
                }}
            />
        </ForgotPasswordStack.Navigator>
    );
}