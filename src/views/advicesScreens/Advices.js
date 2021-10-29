import React from 'react';
import { View, Text, StatusBar } from 'react-native';
//Import Components
import HeaderTopBar from '../../components/headerTopBar/HeaderTopBar';
//Import Styles
import GlobalStyles from '../../globals/GlobalStyles';

const Advices = () => {
    return (
        <View style={GlobalStyles.mainViewContainer}>
            <StatusBar translucent backgroundColor='transparent' />
            <View style={{ flex: .3 }}>
                <HeaderTopBar />
            </View>
            <View style={{ flex: 1.7, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Proximamente...</Text>
            </View>
        </View>
    )
}

export default Advices;