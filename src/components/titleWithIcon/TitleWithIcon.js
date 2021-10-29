import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from '../../globals/Icon';
//Import Styles
import GlobalStyles from '../../globals/GlobalStyles';
import { GlobalVariables } from '../../globals/GlobalVariable';
import Styles from './Styles';


export default function TitleWithIcon({ iconBack, textTitle, onPress }) {
    return (
        <View style={[Styles.titleWithIConMainContainer, GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
            {iconBack ? (
                <View style={[Styles.iconViewContainer]}>
                    <TouchableWithoutFeedback onPress={onPress}>
                        <View style={[Styles.iconView, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                            <Icon.MaterialCommunityIcons adjustsFontSizeToFit name='arrow-left' color={GlobalVariables.TitleColorGrey} size={35} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            ) : (
                <View style={Styles.notIconView}></View>
            )}
            {textTitle ? (
                <View style={Styles.textTitleViewContainer}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textTitle}>{textTitle}</Text>
                </View>
            ) : (
                <View ></View>
            )}
        </View>
    )
}