import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from '../../../globals/Icon';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';


export default function DataPanelCard({ dataItem, according, expanded, setExpanded }) {

    const accordianRef = useRef(null);
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const toggleExpand = (index) => {
        let newArr = [...expanded];
        newArr[index] = !expanded[index]
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(newArr)
    }

    const accordingRender = () => {
        const items = [];
        let index = 0;

        for (let accordingDataItem of according) {
            items.push(accordingItemRender(accordingDataItem, index))
            index++;
        }

        for (let rowDataItem in dataItem) {
            items.push(rowItemPanelRender(rowDataItem, index));
            index++;
        }
        return items;
    }

    const rowPanelRender = () => {
        const items = [];
        let index = 0;
        for (let rowDataItem in dataItem) {
            items.push(rowItemPanelRender(rowDataItem, index));
            index++;
        }
        return items;
    }

    const accordingItemRender = (dataCollaps, index) => {
        return (
            <View key={index} style={Styles.rowInfoViewContainer}>
                <TouchableOpacity onPress={() => toggleExpand(index)} ref={accordianRef}>
                    <View style={GlobalStyles.flexRow}>
                        <View style={GlobalStyles.flexOneView}>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textTitleRow}>{dataCollaps.title}</Text>
                        </View>
                        <View style={[GlobalStyles.flexOneView, Styles.rowSubtitleView]}>
                            <Text style={Styles.textSubtitleRow}>{dataCollaps.subTitle}</Text>
                        </View>
                        <View style={Styles.iconCollapsView}>
                            <Icon.MaterialIcons name={expanded[index] ? 'keyboard-arrow-down' : 'keyboard-arrow-right'} color={GlobalVariables.TitleColorGrey} size={26} />
                        </View>
                    </View>
                </TouchableOpacity>
                {expanded[index] ? (
                    dataCollaps.data.map((arrayValue, index) => {
                        return (
                            <View key={index} style={Styles.collapsViewContainer} >
                                {Object.values(arrayValue).map((itemValue, index) => {
                                    return (
                                        <View key={index} style={[Styles.collapsItemView, GlobalStyles.flexRow]}>
                                            <View style={GlobalStyles.flexOneView}>
                                                <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textTitleCollaps}>{itemValue.key}</Text>
                                            </View>
                                            <View style={[GlobalStyles.flexOneView, Styles.rowSubtitleView]}>
                                                <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textSubtitleCollaps}>{itemValue.value}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    })) : (<></>)
                }
            </View>
        )
    }

    const rowItemPanelRender = (itemValue, index) => {
        return (
            <View key={index} style={[Styles.rowInfoViewContainer, GlobalStyles.flexRow]} >
                <View style={GlobalStyles.flexOneView}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textTitleRow}>{itemValue}:</Text>
                </View>
                <View style={[GlobalStyles.flexOneView, Styles.rowSubtitleView]}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textSubtitleRow}>{dataItem[itemValue]}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={[Styles.dataPanelMainContainer, GlobalStyles.dropShadowButtons]}>
            <ScrollView>
                {according ? (
                    accordingRender()
                ) : (
                    rowPanelRender()
                )}
            </ScrollView>
        </View>
    )
}