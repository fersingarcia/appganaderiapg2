import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//Import Components
import CustomTopTab from '../../components/customTopTab/CustomTopTab';
//Screens Import
import InformationScreen from '../../views/animalsScreens/detailAnimalScreen/informationScreen/InformationScreen';
import ProductionScreen from '../../views/animalsScreens/detailAnimalScreen/productionScreen/ProductionScreen';
import FeedingScreen from '../../views/animalsScreens/detailAnimalScreen/feedingScreen/FeedingScreen';
import ReproductionScreen from '../../views/animalsScreens/detailAnimalScreen/reproductionScreen/ReproductionScreen';

const Tab = createMaterialTopTabNavigator();

export default function DetailTopTab(item) {
    const { typeAnimal } = item.item;
    return (
        <Tab.Navigator initialRouteName='InformationScreen' screenOptions={{ headerShown: false }}
            tabBar={props => <CustomTopTab {...props} />} >
            <Tab.Screen name='InformationScreen' component={InformationScreen} options={{ tabBarLabel: 'Información', }} initialParams={item} />
            {typeAnimal === 'cow' ? (
                <Tab.Screen name='ProductionScreen' component={ProductionScreen} options={{ tabBarLabel: 'Producción', }} initialParams={item} />
            ) : (
                <></>
            )}
            <Tab.Screen name='FeedingScreen' component={FeedingScreen} options={{ tabBarLabel: 'Alimentación', }} initialParams={item} />
            {typeAnimal === 'cow' || typeAnimal === 'bull' ? (
                <Tab.Screen name='ReproductionScreen' component={ReproductionScreen} options={{ tabBarLabel: 'Reproducción', }} initialParams={item} />
            ) : (
                <></>
            )}
        </Tab.Navigator>
    )
}