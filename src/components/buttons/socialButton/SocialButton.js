import React from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
//Import Styles
import Styles from './Style';
import GlobalStyles from '../../../globals/GlobalStyles';


export default function SocialButton({ icon, onPress }) {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[Styles.buttonViewContent, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                <Image style={Styles.iconImage} resizeMode='contain' source={icon} />
            </View>
        </TouchableWithoutFeedback>
    )
}