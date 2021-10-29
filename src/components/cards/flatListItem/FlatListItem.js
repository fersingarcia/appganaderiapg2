import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from '../../../globals/Icon';
import FastImage from 'react-native-fast-image';
//Import Sytles
import Styles from './Styles'
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default function FlatListItem({ itemData }) {
    const navigation = useNavigation();
    const item = itemData.item;
    const ITEM_HEIGHT = 98;

    var uri = GlobalVariables.urlNoImage

    if (item.image) {
        uri = item.image
    }

    const navigateTo = () => {
        if (item.block) {

        } else {
            navigation.navigate('MainDetailAnimal', { item: item });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={navigateTo}>
            <View style={[GlobalStyles.dropShadowButtons, GlobalStyles.flexRow, Styles.itemFlatListContainer, { height: ITEM_HEIGHT }]}>
                <View style={[Styles.imageItemView, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                    <FastImage style={Styles.imageItem} source={{ uri: uri }} />
                </View>
                <View style={Styles.textItemView}>
                    <Text style={Styles.textTitlteItem}>{item.name}</Text>
                    <Text style={Styles.textSubtitleItem}>{item.code}</Text>
                    <Text style={Styles.textSubtitleItem}>{item.purpose}</Text>
                </View>
                <View style={[Styles.iconFavView, GlobalStyles.alignCenter]}>
                    <TouchableWithoutFeedback>
                        <Icon.MaterialCommunityIcons name='heart-outline' color={GlobalVariables.ButtonColorGreen} size={28} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}