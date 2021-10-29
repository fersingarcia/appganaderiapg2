import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import Production from '../views/productionScreens/Production';


const ProductionStack = createStackNavigator();

export default function ProductionStackRoot() {
    return (
        <ProductionStack.Navigator screenOptions={{ headerShown: false }}>
            <ProductionStack.Screen name='Production' component={Production} />
        </ProductionStack.Navigator>
    );
}
