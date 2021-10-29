import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Import Stacks
import BottomTabRoot from './BottomTab';
import CreateCowStackRoot from './cowNavigation/CreateCowStack';
import CreateBullStackRoot from './bullNavigation/CreateBullStack';
import CreateCalfStackRoot from './calfNavigation/CreateCalfStack';
import CreateProduction from '../views/animalsScreens/detailAnimalScreen/productionScreen/createProductionScreen/CreateProduction';
import CreateFeeding from '../views/animalsScreens/detailAnimalScreen/feedingScreen/createFeedingScreen/CreateFeeding';

const RootStack = createStackNavigator();

export default function InitialRootStack() {

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name='BottomTab' component={BottomTabRoot} />
            <RootStack.Screen name='CreateCowRoot' component={CreateCowStackRoot} />
            <RootStack.Screen name='CreateBullRoot' component={CreateBullStackRoot} />
            <RootStack.Screen name='CreateCalfRoot' component={CreateCalfStackRoot} />
            <RootStack.Screen name='CreateProduction' component={CreateProduction} />
            <RootStack.Screen name='CreateFeeding' component={CreateFeeding} />
        </RootStack.Navigator>
    )
}