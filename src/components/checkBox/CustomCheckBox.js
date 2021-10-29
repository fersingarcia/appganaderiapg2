import React from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
//Import Styles
import GlobalStyles from '../../globals/GlobalStyles';
import Styles from './Styles';
import { GlobalVariables } from '../../globals/GlobalVariable';

export default function CustomCheckBox({ label, onSelect, select }) {

    return (
        <View style={[GlobalStyles.justifyCenter, GlobalStyles.flexOneView]}>
            <View style={[GlobalStyles.flexOneView, GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                <CheckBox tintColors={{ true: GlobalVariables.ButtonColorGreen, false: GlobalVariables.MainColorBlack }}
                    disabled={false} value={select} onValueChange={(newValue) => onSelect(newValue)} />
                <Text adjustsFontSizeToFit numberOfLines={1} style={[Styles.textCheckBox]}>{label}</Text>
            </View>
        </View>
    )
}