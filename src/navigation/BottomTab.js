import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Import Components
import CustomTabBar from '../components/customTabBar/CustomTabBar';
//Import Stacks
import HomeStackRoot from './HomeStack';
import AnimalsStackRoot from './AnimalsStack';
import ProductionStackRoot from './ProductionStack';
import AdviceStackRoot from './AdviceStack';

const Tab = createBottomTabNavigator();

export default function BottomTabRoot() {
    return (
        <Tab.Navigator initialRouteName='AnimalsStak' screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
            tabBar={props => <CustomTabBar {...props} />} >
            {/* <Tab.Screen name='HomeStack' component={HomeStackRoot} options={{ nameIcon: 'home-outline', tabBarLabel: 'Inicio', }} /> */}
            <Tab.Screen name='AnimalsStak' component={AnimalsStackRoot} options={{ nameIcon: 'cow', tabBarLabel: 'Ganado', }} />
            <Tab.Screen name='ProductionStack' component={ProductionStackRoot} options={{ nameIcon: 'factory', tabBarLabel: 'Producción', }} />
            <Tab.Screen name='AdviceStack' component={AdviceStackRoot} options={{ nameIcon: 'lightbulb-on-outline', tabBarLabel: 'Consejos', }} />
        </Tab.Navigator>
    )
}