import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
//Import Components
import HeaderTopBar from '../../../../components/headerTopBar/HeaderTopBar';
import TitleWithIcon from '../../../../components/titleWithIcon/TitleWithIcon';
import DetailCard from '../../../../components/cards/detailCard/DetailCard';
import ContainInput from '../../../../components/inputs/containInput/ContainInput';
import DateTimePickerBasic from '../../../../components/pickers/dateTimePicker/DateTimePicker';
import ButtonComponent from '../../../../components/buttons/basicButton/ButtonComponent';
import TakePickBottomSheet from '../../../../components/bottomSheet/takePickBottomSheet/TakePickBottomSheet';
//Import Styles
import GlobalStyles from '../../../../globals/GlobalStyles';
import CreateAnimalStyles from '../../../../globals/CreateAnimalStyles';
import { GlobalVariables } from '../../../../globals/GlobalVariable';

const CreateBullStepOne = ({ navigation: { goBack, navigate } }) => {

    const [display, setDisplay] = useState('flex'),
        [showBottomSheet, setShowBottomSheet] = useState(false),
        [imagePickBull, setImagePickBull] = useState(null),
        [uploadPickBull, setUploadPickBull] = useState(''),
        [nameBull, setNameBull] = useState(''),
        [code, setCode] = useState(''),
        [weightBull, setWeightBull] = useState(''),
        [birthday, setBirthday] = useState(''),
        [showDatePicker, setShowDatePicker] = useState(false);

    const [inputElement] = useState({
        nameBull: { topLabel: 'Nombre del toro', label: 'Ingrese nombre del toro', handleChange: setNameBull },
        codeBull: { topLabel: 'Código', label: 'Ingrese el código', handleChange: setCode },
        weight: { topLabel: 'Peso (kg.)', label: 'Ingrese el peso', handleChange: setWeightBull, typeKeyboard: 'numeric' }
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


    const nextStep = async () => {
        var stepOneData = {
            name: nameBull, code: code, favorite: false,
            birthday: birthday.toString(), weight: weightBull, image: uploadPickBull
        }

        navigate('CreateBullStepTwo', { stepOne: stepOneData })
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
                            <Text style={CreateAnimalStyles.textTitleForm}>Información del toro</Text>
                        </View>
                        <View style={[CreateAnimalStyles.formViewContainer, GlobalStyles.spaceEvenly, GlobalStyles.dropShadowButtons, GlobalStyles.widthStandardContainer]}>
                            <View style={CreateAnimalStyles.detailCardView}>
                                <DetailCard onPress={() => setShowBottomSheet(true)} imageProfile={imagePickBull} title={nameBull}
                                    subTitle={'Codigo: ' + code} />
                            </View>
                            <View style={CreateAnimalStyles.textInputView}>
                                <ContainInput element={inputElement.nameBull} />
                            </View>
                            <View style={[CreateAnimalStyles.textInputView, GlobalStyles.flexRow]}>
                                <View style={[GlobalStyles.flexOneView, CreateAnimalStyles.twoColumInput]}>
                                    <ContainInput element={inputElement.codeBull} />
                                </View>
                                <View style={[GlobalStyles.flexOneView, CreateAnimalStyles.twoColumInput]}>
                                    <ContainInput element={inputElement.weight} />
                                </View>
                            </View>
                            <View style={[CreateAnimalStyles.textInputView, GlobalStyles.flexRow]}>
                                <View style={GlobalStyles.flexOneView}>
                                    <DateTimePickerBasic setShowDatePicker={setShowDatePicker} showDatePicker={showDatePicker}
                                        setDate={setBirthday} date={birthday} topLabel='Fecha de nacimiento' label='Seleccione fecha' />
                                </View>
                                <View style={GlobalStyles.flexOneView} />
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
                <TakePickBottomSheet setUploadImage={setUploadPickBull} setImagePath={setImagePickBull} isVisible={showBottomSheet}
                    setIsVisible={setShowBottomSheet} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CreateBullStepOne;