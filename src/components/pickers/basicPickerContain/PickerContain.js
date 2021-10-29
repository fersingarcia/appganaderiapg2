import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import Icon from '../../../globals/Icon';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';

export default function PickerContain({ pickerElement, setSelectedItem, selectItem, dataItems, pickerMethod, onPress, enabled }) {

    return (
        <View style={GlobalStyles.flexOneView}>
            <View style={[GlobalStyles.labelView]}>
                <Text style={[GlobalStyles.textLabel]}>{pickerElement.topLabel}</Text>
            </View>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[GlobalStyles.inputView, GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                    <View style={[Styles.pickerViewContainer]}>
                        <Picker
                            dropdownIconColor='#FFF'
                            enabled={enabled}
                            itemStyle={Styles.itemPicker}
                            selectedValue={selectItem}
                            onValueChange={(value, index) => setSelectedItem(value)}
                            mode="dropdown" // Android only
                            style={Styles.picker}
                        >
                            <Picker.Item style={Styles.itemPicker} label={pickerElement.label} value="" />
                            {dataItems ?
                                dataItems.map((item, index) => {
                                    return <Picker.Item key={index} style={Styles.itemPicker} label={item.name} value={item.id} />
                                })
                                : (pickerMethod ? pickerMethod() : (<></>)
                                )
                            }
                        </Picker>

                    </View>
                    <View style={[Styles.iconViewContainer, GlobalStyles.alignCenter]}>
                        <Icon.MaterialIcons name='keyboard-arrow-down' size={28} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}