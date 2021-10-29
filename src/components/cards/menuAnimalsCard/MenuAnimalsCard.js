import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image'
//Import Styles
import GlobalStyles from '../../../globals/GlobalStyles';
import Styles from './Styles';

export default function MenuAnimalsCard({ image, title, onPress }) {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[GlobalStyles.dropShadowButtons, Styles.menuButtonMainContainer]}>
                <View style={Styles.imageViewContainer}>
                    <FastImage style={Styles.imageButton} source={{ uri: image }} />
                </View>
                <View style={Styles.textButtonViewContainer}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textTitleButton}>{title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}