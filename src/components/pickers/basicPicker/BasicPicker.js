import React from 'react';
import { View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import Icon from '../../../globals/Icon';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';

export default function BasicPicker({ selectItem, setSelectedItem, dataItems, labelText, nameIcon, sizeIcon }) {

    return (
        <View style={[Styles.pickerViewContainer, GlobalStyles.alignCenter, GlobalStyles.flexRow]}>
            <Icon.MaterialCommunityIcons name={nameIcon} size={sizeIcon} />
            <Picker
                itemStyle={Styles.itemPicker}
                selectedValue={selectItem}
                onValueChange={(value, index) => setSelectedItem(value)}
                mode="dropdown" // Android only
                style={Styles.picker}
            >
                <Picker.Item style={Styles.itemPicker} label={labelText} value="" />
                {dataItems ? (
                    dataItems.map((item, index) => {
                        return <Picker.Item key={index} style={Styles.itemPicker} label={item.name} value={item.name} />
                    })
                ) : (
                    <Picker.Item style={Styles.itemPicker} label='Elija un Departamento primero' value="" />
                )}
            </Picker>
        </View>
    )
}