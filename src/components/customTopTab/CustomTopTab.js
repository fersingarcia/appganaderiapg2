import React, { useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';
//Import Styles
import GlobalStyles from '../../globals/GlobalStyles';
import { GlobalVariables } from '../../globals/GlobalVariable';
import Styles from './Styles';

export default props => {
    const scrollViewRef = useRef(null);
    const { width } = Dimensions.get('window');
    const { state, descriptors, navigation } = props;
    const { routes } = state;

    const focusScroll = (index) => {
        if (scrollViewRef.current !== null) {
            scrollViewRef.current.scrollTo({ x: (width / 3) * (index), animated: true, });
        }
    }



    return (
        <View style={[Styles.tabMainContainer, GlobalStyles.alignCenter]}>
            <View style={[Styles.tabViewContainer]}>
                <ScrollView horizontal={true} ref={scrollViewRef}>
                    {routes.map((route, index) => {
                        const isFocused = state.index === index;

                        if (isFocused) { focusScroll(index) }

                        const { options } = descriptors[route.key];

                        const label = options.tabBarLabel !== undefined ? options.tabBarLabel
                            : options.title !== undefined ? options.title : route.name;

                        const backgroundColor = isFocused ? GlobalVariables.TopTabButtonGreen : '#FFF';
                        const color = isFocused ? '#FFF' : GlobalVariables.TitleColorGrey

                        const onPress = () => {
                            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true, });
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate({ name: route.name, merge: true });
                            }
                        };

                        return (
                            <View key={index} style={[Styles.filterButtonContainer, GlobalStyles.justifyCenter]}>
                                <TouchableWithoutFeedback onPress={onPress}>
                                    <View style={[GlobalStyles.dropShadowButtons, Styles.filterButtonViewContainer, GlobalStyles.alignCenter, GlobalStyles.justifyCenter, { backgroundColor }]}>
                                        <Text adjustsFontSizeToFit style={[Styles.textButtonFilter, { color }]} >{label}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}