import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from '../../../globals/Icon';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default function ZealCard({ dataItem, showModal }) {


    const rowCardRender = () => {
        const items = [];
        let index = 0;
        for (let rowDataItem in dataItem) {
            items.push(rowItemPanelRender(rowDataItem, index));
            index++;
        }
        return items;
    }

    const rowItemPanelRender = (itemValue, index) => {
        return (
            <TouchableWithoutFeedback onPress={() => showModal(true)} key={index}>
                <View style={[Styles.rowInfoViewContainer, GlobalStyles.flexRow, GlobalStyles.flexOneView, GlobalStyles.alignCenter]} >
                    <View style={GlobalStyles.flexOneView}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textTitleRow}>{itemValue}:</Text>
                    </View>
                    <View style={[GlobalStyles.flexOneView, Styles.rowSubtitleView, GlobalStyles.alignCenter]}>
                        <View style={Styles.iconView}>
                            <Icon.FontAwesome5 name='pen' size={14} color={GlobalVariables.TitleColorGrey} />
                        </View>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textSubtitleRow}>{dataItem[itemValue]}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={[Styles.dataPanelMainContainer, GlobalStyles.dropShadowButtons, GlobalStyles.flexOneView]}>
            {rowCardRender()}
        </View>
    )
}