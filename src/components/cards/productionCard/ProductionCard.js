import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';

export default function ProductionCard({ titleCard, animalDataItem }) {

    const rowItemsRender = () => {
        const items = [];
        let index = 0;
        for (let rowDataItem in animalDataItem) {
            items.push(rowItemRender(rowDataItem, index));
            index++;
        }
        return items;
    }

    const rowItemRender = (itemValue, index) => {
        return (
            <View key={index} style={[Styles.rowInfoViewContainer, GlobalStyles.flexRow]} >
                <View style={GlobalStyles.flexOneView}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textTitleRow}>{itemValue}:</Text>
                </View>
                <View style={[GlobalStyles.flexOneView, Styles.rowSubtitleView]}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textSubtitleRow}>{animalDataItem[itemValue]}</Text>
                </View>
            </View>
        )
    }


    return (
        <View style={[Styles.cardMainContainer, GlobalStyles.dropShadowButtons, GlobalStyles.justifyCenter]}>
            <Text style={Styles.textTitleCard}>{titleCard}</Text>
            <View style={Styles.internalViewContainer}>
                <ScrollView>
                    {Object.values(animalDataItem).length > 0 ?
                        rowItemsRender() : (
                            <View style={[Styles.loaderItems, GlobalStyles.alignCenter]}>
                                <ActivityIndicator size="large" />
                                <Text>Cargando información</Text>
                            </View>
                        )}
                </ScrollView>
            </View>
        </View>
    )
}