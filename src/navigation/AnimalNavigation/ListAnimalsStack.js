import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens Import
import ListCow from '../../views/animalsScreens/cowScreens/ListCow';
import ListBull from '../../views/animalsScreens/bullScreens/ListBull';
import ListCalf from '../../views/animalsScreens/calfScreens/ListCalf';
import MainDetailAnimal from '../../views/animalsScreens/detailAnimalScreen/MainDetailAnimal';


const ListCowStack = createStackNavigator();

export default function ListAnimalStackRoot() {
    return (
        <ListCowStack.Navigator screenOptions={{ headerShown: false }}>
            <ListCowStack.Screen name='ListCow' component={ListCow} />
            <ListCowStack.Screen name='ListBull' component={ListBull} />
            <ListCowStack.Screen name='ListCalf' component={ListCalf} />
            <ListCowStack.Screen name='MainDetailAnimal' component={MainDetailAnimal} />
        </ListCowStack.Navigator>
    );
}