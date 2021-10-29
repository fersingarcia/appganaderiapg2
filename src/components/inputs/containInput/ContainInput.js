import React from 'react';
import { View, Text, TextInput } from 'react-native';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default function ContainInput({ element }) {
    return (
        <View style={GlobalStyles.flexOneView}>
            <View style={[GlobalStyles.labelView]}>
                <Text style={[GlobalStyles.textLabel]}>{element.topLabel}</Text>
            </View>
            <View style={[GlobalStyles.inputView, GlobalStyles.justifyCenter]}>
                <TextInput
                    multiline={element.multiline}
                    keyboardType={element.typeKeyboard}
                    style={Styles.textInput}
                    placeholderTextColor={GlobalVariables.MainColorBlack}
                    placeholder={element.label}
                    onChangeText={element.handleChange}
                />
            </View>
        </View>
    )
}