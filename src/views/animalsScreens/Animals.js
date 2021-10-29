import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
//Import Components
import HeaderTopBar from '../../components/headerTopBar/HeaderTopBar';
import TitleWithIcon from '../../components/titleWithIcon/TitleWithIcon';
import MenuAnimalsCard from '../../components/cards/menuAnimalsCard/MenuAnimalsCard';
//Import AsyncStorage
import { getData } from '../../functions/AsyncStorage';
//Import Styles
import GlobalStyles from '../../globals/GlobalStyles';
import Styles from './Styles';

const Animals = ({ navigation: { navigate } }) => {

    const [menuItemsResult, setMenuItemsResult] = useState([]);

    const loadMenuItems = () => {
        getData('mainMenu').then((value) => {
            var arrayValue = Object.values(JSON.parse(value))
            var result = arrayValue.reduce(function (r, o) {
                var k = o.idMenu;  // unique `loc` key
                if (r[k] || (r[k] = [])) r[k].push({ menuTitle: o.menuTitle, image: o.image, urlNav: o.urlNav });
                return r
            }, {});

            setMenuItemsResult(Object.values(result))
        })
    }

    useEffect(() => {
        loadMenuItems();
    }, [])

    return (
        <View style={GlobalStyles.mainViewContainer}>
            <StatusBar translucent backgroundColor='transparent' />
            <View style={Styles.headerTopViewContainer}>
                <HeaderTopBar />
            </View>
            <View style={Styles.bodyViewContainer}>
                <View style={[GlobalStyles.flexRow, Styles.titleViewContainer]}>
                    <TitleWithIcon textTitle={'Control de Ganado'} />
                </View>
                <View style={[Styles.menuViewContainer, GlobalStyles.spaceEvenly]}>
                    {menuItemsResult.map((menuItem, index) => {
                        return (
                            <View key={index} style={[Styles.menuItemRowView, GlobalStyles.flexRow, GlobalStyles.spaceEvenly]}>
                                {menuItem.map((menuCardsItem, index) => {
                                    return (
                                        <View key={index} style={Styles.menuCardView}>
                                            <MenuAnimalsCard onPress={() => navigate('ListAnimalStackRoot', { screen: menuCardsItem.urlNav })} image={menuCardsItem.image} title={menuCardsItem.menuTitle} />
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

export default Animals;