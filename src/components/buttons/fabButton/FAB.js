import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';


export default function FAB({ onPress, nameIcon }) {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[Styles.fabContainer, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                <Icon name='plus' color='#FFF' size={36} />
            </View>
        </TouchableWithoutFeedback>
    )
}