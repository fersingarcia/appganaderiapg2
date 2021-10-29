import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
//Import Auth
import { onSingOut } from '../../services/FirebaseAuth';
//Import Styles
import GlobalStyles from '../../globals/GlobalStyles';
//Import Components
import HeaderTopBar from '../../components/headerTopBar/HeaderTopBar';


const Home = ({ navigation: { navigate } }) => {


    return (
        <View style={GlobalStyles.mainViewContainer}>
            <StatusBar translucent backgroundColor='transparent' />
            <View style={{ flex: .3 }}>
                <HeaderTopBar />
            </View>
            <View style={{ flex: 1.7 }}>
                {/* <Button title='logged' onPress={onSingOut} />
                <Button title='Animals' onPress={() => navigate('Animals')} /> */}

            </View>
            {/* <View style={{ flex: .2, justifyContent: 'center', alignItems: 'center', }}>
                <BottomTabBar />
            </View> */}
        </View>
    )
}

export default Home;