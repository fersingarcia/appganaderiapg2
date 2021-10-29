import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from '../../../globals/Icon';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default function DetailCard({ onPress, imageProfile, iconOptions, title, subTitle, subTitle2 }) {

    return (
        <View style={[Styles.photoView, GlobalStyles.flexRow]}>
            <View style={[GlobalStyles.flexOneView, GlobalStyles.justifyCenter]}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={[Styles.photoCardContainer, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                        {imageProfile ? (
                            <Image style={Styles.profileImage} source={{ uri: imageProfile }} />
                        ) : (
                            <View style={[Styles.iconViewContainer, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                                <Icon.MaterialCommunityIcons adjustsFontSizeToFit name='camera' color={GlobalVariables.SubtitleColorGrey} size={36} />
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={[GlobalStyles.flexOneView, GlobalStyles.justifyCenter]}>
                <View style={Styles.textNameView} >
                    <Text adjustsFontSizeToFit style={Styles.textTitle}>{title}</Text>
                </View>
                <View style={Styles.textSubTitleView} >
                    <Text adjustsFontSizeToFit style={Styles.textSubtitle}>{subTitle}</Text>
                </View>
                <View style={Styles.textSubtitleTwoView} >
                    <Text adjustsFontSizeToFit style={Styles.textSubtitle}>{subTitle2}</Text>
                </View>
            </View>
            {iconOptions ? (
                <View style={Styles.iconRightView}>
                    <TouchableWithoutFeedback>
                        <Icon.SimpleLineIcons name='options-vertical' color={GlobalVariables.OptionsColorGrey} size={28} />
                    </TouchableWithoutFeedback>
                </View>
            ) : (
                <View style={Styles.iconRightView}>
                    <TouchableWithoutFeedback>
                        <Icon.MaterialCommunityIcons name='heart-outline' color={GlobalVariables.ButtonColorGreen} size={28} />
                    </TouchableWithoutFeedback>
                </View>
            )}

        </View>
    )
}