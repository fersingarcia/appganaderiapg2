import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from '../../../globals/Icon';
import GlobalStyles from '../../../globals/GlobalStyles';
//Import Styles
import Styles from './Styles';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default function OutlineInput({ element }) {

    return (
        <View style={[Styles.inputContainer, GlobalStyles.alignCenter, GlobalStyles.flexRow]}>
            <View style={[Styles.inputIconView, GlobalStyles.alignCenter]}>
                <Icon.MaterialCommunityIcons name={element.nameIcon} color={element.colorIcon} size={24} />
            </View>
            <View style={[Styles.inputMainView, GlobalStyles.flexRow]}>
                <View style={Styles.inputView}>
                    <TextInput
                        keyboardType={element.keyboard}
                        secureTextEntry={element.enablePassword}
                        style={Styles.textInput}
                        placeholder={element.label}
                        placeholderTextColor={GlobalVariables.MainColorBlack}
                        onChangeText={element.handleChange}
                    />
                </View>
                <View style={[Styles.errorIconView, GlobalStyles.justifyCenter]}>
                    {element.errorIconDisplay ? (
                        <Icon name='alert-circle-outline' color='red' type='material-community' size={24} />
                    ) : (<></>)
                    }

                </View>
            </View>
        </View>
    )

}