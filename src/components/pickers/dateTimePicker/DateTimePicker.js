import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default function DateTimePickerBasic({ topLabel, label, showDatePicker, setShowDatePicker, date, setDate, onHandleChange }) {

    const [labelDate, setLabelDate] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        const dateConvert = moment(currentDate).format("DD/MM/YYYY")
        setShowDatePicker(false);
        setDate(currentDate);
        setLabelDate(dateConvert);
    };

    const showPicker = () => {
        setShowDatePicker(true)
    }

    const inputViewLabel = StyleSheet.compose([GlobalStyles.inputView, GlobalStyles.alignCenter, GlobalStyles.flexRow]);
    const inputViewNoLabel = StyleSheet.compose([Styles.inputNoLabel, GlobalStyles.alignCenter, GlobalStyles.flexRow]);

    return (
        <TouchableWithoutFeedback onPress={() => showPicker()}>
            <View style={GlobalStyles.flexOneView}>
                {topLabel ? (
                    <View style={[GlobalStyles.labelView]}>
                        <Text adjustsFontSizeToFit style={[GlobalStyles.textLabel]}>{topLabel}</Text>
                    </View>
                ) : (
                    <></>
                )}
                <View style={topLabel ? inputViewLabel : inputViewNoLabel}>
                    <View style={Styles.labelInterViewContainer}>
                        <TextInput placeholderTextColor={GlobalVariables.MainColorBlack} editable={false} keyboardType='default'
                            style={Styles.textLabelInter} value={labelDate} placeholder={label} />
                    </View>
                    <View style={[Styles.iconView, GlobalStyles.alignCenter]}>
                        <Icon name='date-range' size={22} color={GlobalVariables.TitleColorGrey} />
                    </View>
                </View>
                {showDatePicker && (
                    <DateTimePicker value={new Date()} mode='date' display="default" onChange={onHandleChange ? onHandleChange : onChange} />
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}