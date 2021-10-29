import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';

export default function ButtonComponent({ onPress, textButton, backgroundColor, textColor, dropShadow }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[Styles.buttonViewContent, GlobalStyles.justifyCenter, dropShadow, { backgroundColor }]}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={[Styles.textButton, { color: textColor }]}>{textButton}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}