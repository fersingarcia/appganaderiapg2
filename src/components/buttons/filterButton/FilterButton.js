import React from 'react';
import { View, SafeAreaView, Text, TouchableWithoutFeedback } from 'react-native';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';

export default function FilterButton({ filterItems }) {
    return (
        <>
            {filterItems.map((item, index) => {
                return (
                    <View key={index} style={[Styles.filterButtonContainer, GlobalStyles.justifyCenter]}>
                        <TouchableWithoutFeedback>
                            <View style={[GlobalStyles.dropShadowButtons, Styles.filterButtonViewContainer, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                                <Text adjustsFontSizeToFit style={Styles.textButtonFilter} >{item.textButton}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )
            }
            )
            }
        </>
    )
}