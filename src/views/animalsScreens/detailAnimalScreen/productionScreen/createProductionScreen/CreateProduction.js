import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firestore from '@react-native-firebase/firestore';
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

const CreateProduction = ({ route, navigation: { goBack } }) => {
    const { idAnimal } = route.params;

    const [display, setDisplay] = useState('flex'),
        [litersMilk, setLitersMilk] = useState(''),
        [calfConsum, setCalfConsum] = useState(''),
        [poundsMeal, setPoundsMeal] = useState(''),
        [milkType, setMilkType] = useState(''),
        [morning, setMorning] = useState(false),
        [afternoon, setAfternoon] = useState(false),
        [schedule, setSchedule] = useState(''),
        [dateNow, setDateNow] = useState(moment(new Date()).format("DD/MM/YYYY")),
        [date, setDate] = useState(null),
        [showDatePicker, setShowDatePicker] = useState(false);

    const [pickerMilkTypeItem] = useState(PickerItemsData.PickerMilkTypeItems)

    const [pickerElement] = useState({
        milkType: { topLabel: 'Tipo de Leche', label: 'Seleccione tipo de leche' }
    })
    const [inputElement] = useState({
        litersMilk: { topLabel: 'Litros de leche', label: 'Ingrese leche ordeñada', handleChange: setLitersMilk, typeKeyboard: 'numeric' },
        calfConsum: { topLabel: 'Consumo para ternero (Lt.)', label: 'Ingrese consumo ternero', handleChange: setCalfConsum, typeKeyboard: 'numeric' },
        poundsMeal: { topLabel: 'Libras de concentrado', label: 'Ingrese consumo concentrado', handleChange: setPoundsMeal, typeKeyboard: 'numeric' }
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

    const CreateProductionRegister = async () => {
        const dateProduction = (new Date(date.toDateString()));

        const dataProductionSave = {
            calfConsum: Number(calfConsum), date: String(dateProduction), idAnimal: idAnimal, liters: Number(litersMilk), milkType: 'Consumo',
            poundsMeal: Number(poundsMeal), schedule: schedule, createdAt: firestore.FieldValue.serverTimestamp()
        }

        createDocumentDB('production', dataProductionSave).then(() => { goBack() })
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
                            <Text style={Styles.textTitleForm}>Registro de Ordeño</Text>
                        </View>
                        <View style={[Styles.formViewContainer, GlobalStyles.spaceEvenly, GlobalStyles.dropShadowButtons, GlobalStyles.widthStandardContainer]}>
                            <View style={[Styles.pickerView, GlobalStyles.flexRow]}>
                                <View style={Styles.pickerViewContainer}>
                                    <DateTimePickerBasic setShowDatePicker={setShowDatePicker} showDatePicker={showDatePicker}
                                        setDate={setDate} date={date} topLabel='Seleccione la fecha' label={dateNow} />
                                </View>
                            </View>
                            <View style={Styles.textInputView}>
                                <ContainInput element={inputElement.litersMilk} />
                            </View>
                            <View style={Styles.textInputView}>
                                <ContainInput element={inputElement.calfConsum} />
                            </View>
                            <View style={Styles.textInputView}>
                                <ContainInput element={inputElement.poundsMeal} />
                            </View>
                            <View style={Styles.textInputView}>
                                <PickerContain pickerElement={pickerElement.milkType} selectItem={milkType} setSelectedItem={setMilkType}
                                    dataItems={pickerMilkTypeItem} />
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
                                        dropShadow={GlobalStyles.dropShadowButtons} onPress={CreateProductionRegister} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CreateProduction;