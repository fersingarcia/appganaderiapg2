import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
//Import Styles
import Styles from './Styles';
import { GlobalVariables } from '../../../globals/GlobalVariable';
import GlobalStyles from '../../../globals/GlobalStyles';

export default function SearchInput({ element }) {
    return (
        <View style={[Styles.searchInputContainer, GlobalStyles.flexRow, GlobalStyles.dropShadowButtons]}>
            <View style={[Styles.iconSearchViewContainer, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                <Icon adjustsFontSizeToFit name='search' color={GlobalVariables.SubtitleColorGrey} size={22} />
            </View>
            <View style={[Styles.textInputSearchViewContainer, GlobalStyles.justifyCenter]}>
                <TextInput style={Styles.textInputSearch} placeholder={element.label} onChangeText={element.handleChange}
                    placeholderTextColor={GlobalVariables.MainColorBlack} />
            </View>
        </View>
    )
}