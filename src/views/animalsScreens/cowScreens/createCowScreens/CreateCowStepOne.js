import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
//Import Components
import HeaderTopBar from '../../../../components/headerTopBar/HeaderTopBar';
import TitleWithIcon from '../../../../components/titleWithIcon/TitleWithIcon';
import DetailCard from '../../../../components/cards/detailCard/DetailCard';
import ContainInput from '../../../../components/inputs/containInput/ContainInput';
import DateTimePickerBasic from '../../../../components/pickers/dateTimePicker/DateTimePicker';
import CustomCheckBox from '../../../../components/checkBox/CustomCheckBox';
import ButtonComponent from '../../../../components/buttons/basicButton/ButtonComponent';
import TakePickBottomSheet from '../../../../components/bottomSheet/takePickBottomSheet/TakePickBottomSheet';
//Import Styles
import GlobalStyles from '../../../../globals/GlobalStyles';
import CreateAnimalStyles from '../../../../globals/CreateAnimalStyles';
import { GlobalVariables } from '../../../../globals/GlobalVariable';

const CreateCowStepOne = ({ navigation: { goBack, navigate } }) => {

    const [display, setDisplay] = useState('flex'),
        [showBottomSheet, setShowBottomSheet] = useState(false),
        [imagePickCow, setImagePickCow] = useState(null),
        [uploadPickCow, setUploadPickCow] = useState(''),
        [nameCow, setNameCow] = useState(''),
        [code, setCode] = useState(''),
        [weightCow, setWeightCow] = useState(''),
        [birthday, setBirthday] = useState(''),
        [milking, setMilking] = useState(false),
        [fatten, setFatten] = useState(false),
        [purpose, setPurpose] = useState(''),
        [showDatePicker, setShowDatePicker] = useState(false);

    const [checkBoxElement] = useState({
        milking: { textLabel: 'Lechera', onSelect: setMilking, select: milking }
    });
    const [inputElement] = useState({
        nameCow: { topLabel: 'Nombre de la vaca', label: 'Ingrese nombre de la vaca', handleChange: setNameCow },
        codeCow: { topLabel: 'Código', label: 'Ingrese el código', handleChange: setCode },
        weight: { topLabel: 'Peso (kg.)', label: 'Ingrese el peso', handleChange: setWeightCow, typeKeyboard: 'numeric' }
    });

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

    const nextStep = async () => {
        var stepOneData = {
            name: nameCow, code: code, purpose: purpose, favorite: false,
            birthday: birthday.toString(), weight: weightCow, image: uploadPickCow
        }
        navigate('CreateCowStepTwo', { stepOne: stepOneData })
    }

    const onChangeMilking = (value) => {
        setMilking(value)
        setFatten(false);
        if (value) {
            setPurpose('Lechera')
        } else { setPurpose('') }

    }

    const onChangeFatten = (value) => {
        setFatten(value)
        setMilking(false);
        if (value) {
            setPurpose('Engorde')
        } else { setPurpose('') }


    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyles.mainViewContainer}>
                <View style={[CreateAnimalStyles.headerTopViewContainer, { display }]}>
                    <HeaderTopBar />
                </View>
                {display === 'none' ? <View style={CreateAnimalStyles.displayTitleOff} /> : <></>}
                <View style={CreateAnimalStyles.bodyViewContainer}>
                    <View style={[CreateAnimalStyles.titleViewContainer, { display }]}>
                        <TitleWithIcon iconBack onPress={() => goBack()} />
                    </View>
                    <View style={[CreateAnimalStyles.bodyFormViewContainer, GlobalStyles.alignCenter]}>
                        <View style={[CreateAnimalStyles.titleFormView, GlobalStyles.alignCenter]}>
                            <Text style={CreateAnimalStyles.textTitleForm}>Información de la vaca</Text>
                        </View>
                        <View style={[CreateAnimalStyles.formViewContainer, GlobalStyles.spaceEvenly, GlobalStyles.dropShadowButtons, GlobalStyles.widthStandardContainer]}>
                            <View style={CreateAnimalStyles.detailCardView}>
                                <DetailCard onPress={() => setShowBottomSheet(true)} imageProfile={imagePickCow} title={nameCow}
                                    subTitle={'Codigo: ' + code} subTitle2={purpose} />
                            </View>
                            <View style={CreateAnimalStyles.textInputView}>
                                <ContainInput element={inputElement.nameCow} />
                            </View>
                            <View style={[CreateAnimalStyles.textInputView, GlobalStyles.flexRow]}>
                                <View style={[CreateAnimalStyles.firstColumnView, CreateAnimalStyles.twoColumInput]}>
                                    <ContainInput element={inputElement.codeCow} />
                                </View>
                                <View style={GlobalStyles.flexOneView}>
                                    <DateTimePickerBasic setShowDatePicker={setShowDatePicker} showDatePicker={showDatePicker}
                                        setDate={setBirthday} date={birthday} topLabel='Fecha de nacimiento' label='Seleccione fecha' />
                                </View>
                            </View>
                            <View style={[CreateAnimalStyles.textInputView, GlobalStyles.flexRow]}>
                                <View style={[CreateAnimalStyles.firstColumnView, CreateAnimalStyles.twoColumInput]}>
                                    <ContainInput element={inputElement.weight} />
                                </View>
                                <View style={[GlobalStyles.flexOneView]}>
                                    <View style={[GlobalStyles.labelView]}>
                                        <Text adjustsFontSizeToFit numberOfLines={1} style={[GlobalStyles.textLabel]}>Seleccione la finalidad</Text>
                                    </View>
                                    <View style={[GlobalStyles.flexOneView, GlobalStyles.flexRow]}>
                                        <CustomCheckBox label='Lechera' onSelect={onChangeMilking} select={milking} />
                                        <CustomCheckBox label='Engorde' onSelect={onChangeFatten} select={fatten} />
                                    </View>
                                </View>
                            </View>
                            <View style={[CreateAnimalStyles.buttonsViewContainer, GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                                <View style={GlobalStyles.buttonNextStepView}>
                                    <ButtonComponent textButton='Continuar' backgroundColor={GlobalVariables.ButtonColorGreen} textColor='#FFF'
                                        dropShadow={GlobalStyles.dropShadowButtons} onPress={nextStep} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <TakePickBottomSheet setUploadImage={setUploadPickCow} setImagePath={setImagePickCow} isVisible={showBottomSheet}
                    setIsVisible={setShowBottomSheet} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CreateCowStepOne;