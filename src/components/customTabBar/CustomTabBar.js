import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Keyboard } from 'react-native';
import Icon from '../../globals/Icon';
//Import Styles
import GlobalStyles from '../../globals/GlobalStyles';
import { GlobalVariables } from '../../globals/GlobalVariable';
import Styles from './Styles';

export default props => {

    const { state, descriptors, navigation } = props;
    const { routes } = state;
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let keyboardEventListeners;
        if (Platform.OS === 'android') {
            keyboardEventListeners = [
                Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
                Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
            ];
        }
        return () => {
            if (Platform.OS === 'android') {
                keyboardEventListeners && keyboardEventListeners.forEach(eventListener => eventListener.remove());
            }
        };
    }, []);

    const onPress = (route, index) => {
        navigation.navigate(route)
    };

    if (!visible) return null;
    if (visible || Platform.OS === 'ios') {
        return (
            <View style={[Styles.tabMainContainer, GlobalStyles.justifyCenter, GlobalStyles.alignCenter]}>
                <View style={[GlobalStyles.dropShadowBottomTab, Styles.bottomTabContainer, GlobalStyles.flexRow]}>
                    {routes.map((route, index) => {
                        const { options } = descriptors[route.key];

                        const label = options.tabBarLabel !== undefined ? options.tabBarLabel
                            : options.title !== undefined ? options.title : route.name;

                        const isFocused = state.index === index;

                        const colorFocus = isFocused ? GlobalVariables.TitleColorGreen : GlobalVariables.MainColorBlack;

                        return (
                            <React.Fragment key={index}>
                                <TouchableOpacity key={index} onPress={() => onPress(route.name, index)}
                                    style={[Styles.touchableView, GlobalStyles.justifyCenter]}>
                                    <View style={[Styles.iconViewContainer, GlobalStyles.alignCenter,]}>
                                        <Icon.MaterialCommunityIcons adjustsFontSizeToFit name={options.nameIcon} color={colorFocus} size={28} />
                                    </View>
                                    <View style={[GlobalStyles.alignCenter, GlobalStyles.justifyCenter, Styles.labelViewContainer]}>
                                        {isFocused ?
                                            (
                                                <View style={Styles.labelBackgroundView}>
                                                </View>
                                            ) : (<></>)
                                        }
                                        <Text adjustsFontSizeToFit numberOfLines={1} style={[Styles.textLabel, { color: colorFocus }]}>{label}</Text>
                                    </View>
                                </TouchableOpacity>
                            </React.Fragment>
                        )
                    })}
                </View>
            </View>
        )
    }
}