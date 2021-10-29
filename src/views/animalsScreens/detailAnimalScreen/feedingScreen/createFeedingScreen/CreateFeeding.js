import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from "@react-native-picker/picker";
import moment from 'moment';
//Import Components
import HeaderTopBar from '../../../../../components/headerTopBar/HeaderTopBar';
import ContainInput from '../../../../../components/inputs/containInput/ContainInput';
import DateTimePickerBasic from '../../../../../components/pickers/dateTimePicker/DateTimePicker';
import ButtonComponent from '../../../../../components/buttons/basicButton/ButtonComponent';
import CustomCheckBox from '../../../../../components/checkBox/CustomCheckBox';
import PickerContain from '../../../../../components/pickers/basicPickerContain/PickerContain';
//Import Firebase
import { createDocumentDB } from '../../../../../services/FirebaseCollections';
//Import Constants
import { PickerItemsData } from '../../../../../constants/PickerItems';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../../../globals/GlobalVariable';

const CreateFeeding = ({ route, navigation: { goBack } }) => {
    const { idAnimal } = route.params;

    const [display, setDisplay] = useState('flex'),
        [typeFeeding, setTypeFeeding] = useState(''),
        [typeFeed, setTypeFeed] = useState(''),
        [poundsFeed, setPoundsFeed] = useState(''),

        [morning, setMorning] = useState(false),
        [afternoon, setAfternoon] = useState(false),
        [schedule, setSchedule] = useState(''),
        [concentrado, setConcentrado] = useState(false),
        [salt, setSalt] = useState(false),
        [forraje, setForraje] = useState(false),
        [dateNow, setDateNow] = useState(moment(new Date()).format("DD/MM/YYYY")),
        [date, setDate] = useState(null),
        [showDatePicker, setShowDatePicker] = useState(false);

    const [pickertypeFeedingItem, setPickerTypeFeedingItem] = useState(PickerItemsData.PickerConcentradoItems);


    const [pickerElement] = useState({
        typeFeeding: { topLabel: 'Tipo de Alimento', label: 'Seleccione alimento' }
    })
    const [inputElement] = useState({
        poundsFeed: { topLabel: 'Alimento consumido (Lb)', label: 'Ingrese alimento consumido', handleChange: setPoundsFeed, typeKeyboard: 'numeric' }
    })

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setDisplay('none');
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setDisplay('flex');
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);


    const CreateFeedingRegister = async () => {
        const dateFeeding = (new Date(date.toDateString()));
        if (schedule === 'Mañana') {
            var dataFeedingSave = {
                date: String(dateFeeding),
                idAnimal: idAnimal,
                schedule: schedule,
                typeFeed: typeFeed,
                afternoon: Number(0),
                morning: Number(poundsFeed),
                createdAt: firestore.FieldValue.serverTimestamp(),
                typeFeeding: typeFeeding
            }
        } else {
            var dataFeedingSave = {
                date: String(dateFeeding),
                idAnimal: idAnimal,
                typeFeed: typeFeed,
                schedule: schedule,
                afternoon: Number(poundsFeed),
                morning: Number(0),
                createdAt: firestore.FieldValue.serverTimestamp(),
                typeFeeding: typeFeeding
            }
        }
        createDocumentDB('feeding', dataFeedingSave).then(() => { goBack() })
    }

    const onChangeMorning = (value) => {
        setMorning(value)
        setAfternoon(false);
        if (value) {
            setSchedule('Mañana')
        } else { setSchedule('') }
    }

    const onChangeAfternoon = (value) => {
        setAfternoon(value)
        setMorning(false);
        if (value) {
            setSchedule('Tarde')
        } else { setSchedule('') }
    }

    const onChangeConcentrado = (value) => {
        setConcentrado(value)
        setForraje(false);
        setSalt(false);
        if (value) {
            setTypeFeeding('Concentrado');
            setPickerTypeFeedingItem(PickerItemsData.PickerConcentradoItems)
        } else { setTypeFeeding('') }
    }

    const onChangeSalt = (value) => {
        setSalt(value);
        setConcentrado(false);
        setForraje(false);
        if (value) {
            setTypeFeeding('Sal');
        } else { setPurpose('') }
    }

    const onChangeForraje = (value) => {
        setForraje(value)
        setConcentrado(false);
        setSalt(false)
        if (value) {
            setTypeFeeding('Forraje')
        } else { setTypeFeeding('') }
    }

    const renderItemPicker = () => {
        if (concentrado) {
            return (
                PickerItemsData.PickerConcentradoItems.map((item, index) => {
                    return <Picker.Item key={index} style={Styles.itemPicker} label={item.name} value={item.id} />
                })
            )
        } else if (salt) {
            return (
                PickerItemsData.PickerSaltItems.map((item, index) => {
                    return <Picker.Item key={index} style={Styles.itemPicker} label={item.name} value={item.id} />
                })
            )
        } else if (forraje) {
            return (
                PickerItemsData.PickerForrajeItems.map((item, index) => {
                    return <Picker.Item key={index} style={Styles.itemPicker} label={item.name} value={item.id} />
                })
            )
        } else {
            return (
                <></>
            )
        }
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyles.mainViewContainer}>
                <View style={[Styles.headerTopViewContainer, { display }]}>
                    <HeaderTopBar />
                </View>
                {display === 'none' ? <View style={Styles.displayTitleOff} /> : <></>}
                <View style={Styles.bodyViewContainer}>
                    <View style={[Styles.bodyFormViewContainer, GlobalStyles.alignCenter]}>
                        <View style={[Styles.titleFormView, GlobalStyles.alignCenter]}>
                            <Text style={Styles.textTitleForm}>Registro de Alimentación</Text>
                        </View>
                        <View style={[Styles.formViewContainer, GlobalStyles.spaceEvenly, GlobalStyles.dropShadowButtons, GlobalStyles.widthStandardContainer]}>
                            <View style={[Styles.pickerView, GlobalStyles.flexRow]}>
                                <View style={Styles.pickerViewContainer}>
                                    <DateTimePickerBasic setShowDatePicker={setShowDatePicker} showDatePicker={showDatePicker}
                                        setDate={setDate} date={date} topLabel='Fecha de alimentación' label={dateNow} />
                                </View>
                            </View>
                            <View style={Styles.textInputView}>
                                <View style={[GlobalStyles.labelView]}>
                                    <Text adjustsFontSizeToFit numberOfLines={1} style={[GlobalStyles.textLabel]}>Elija el tipo de alimentación</Text>
                                </View>
                                <View style={[GlobalStyles.flexOneView, GlobalStyles.flexRow]}>
                                    <View style={Styles.checkBoxLargeView}>
                                        <CustomCheckBox label='Concentrado' onSelect={onChangeConcentrado} select={concentrado} />
                                    </View>
                                    <View style={GlobalStyles.flexOneView}>
                                        <CustomCheckBox label='Forraje' onSelect={onChangeForraje} select={forraje} />
                                    </View>
                                    <View style={GlobalStyles.flexOneView}>
                                        <CustomCheckBox label='Sal' onSelect={onChangeSalt} select={salt} />
                                    </View>
                                </View>
                            </View>
                            <View style={Styles.textInputView}>
                                <PickerContain pickerElement={pickerElement.typeFeeding} selectItem={typeFeed} setSelectedItem={setTypeFeed}
                                    pickerMethod={renderItemPicker} />
                            </View>
                            <View style={Styles.textInputView}>
                                <ContainInput element={inputElement.poundsFeed} />
                            </View>
                            <View style={Styles.checkBoxView}>
                                <View style={[GlobalStyles.labelView]}>
                                    <Text adjustsFontSizeToFit numberOfLines={1} style={[GlobalStyles.textLabel]}>Seleccione el horario de ordeño</Text>
                                </View>
                                <View style={[GlobalStyles.flexOneView, GlobalStyles.flexRow]}>
                                    <CustomCheckBox label='Mañana' onSelect={onChangeMorning} select={morning} />
                                    <CustomCheckBox label='Tarde' onSelect={onChangeAfternoon} select={afternoon} />
                                </View>
                            </View>
                            <View style={[Styles.buttonsViewContainer, GlobalStyles.alignCenter]}>
                                <View style={GlobalStyles.buttonCancelView}>
                                    <ButtonComponent textButton='Cancelar' backgroundColor='#FFF' textColor='#000' onPress={() => goBack()} />
                                </View>
                                <View style={GlobalStyles.buttonNextStepView}>
                                    <ButtonComponent textButton='Guardar' backgroundColor={GlobalVariables.ButtonColorGreen} textColor='#FFF'
                                        dropShadow={GlobalStyles.dropShadowButtons} onPress={CreateFeedingRegister} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CreateFeeding;