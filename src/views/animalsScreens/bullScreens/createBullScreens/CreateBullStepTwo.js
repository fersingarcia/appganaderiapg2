import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
//Import Components
import HeaderTopBar from '../../../../components/headerTopBar/HeaderTopBar';
import TitleWithIcon from '../../../../components/titleWithIcon/TitleWithIcon';
import ContainInput from '../../../../components/inputs/containInput/ContainInput';
import PickerContain from '../../../../components/pickers/basicPickerContain/PickerContain';
import CustomCheckBox from '../../../../components/checkBox/CustomCheckBox';
import ButtonComponent from '../../../../components/buttons/basicButton/ButtonComponent';
//Import Constants
import { PickerItemsData } from '../../../../constants/PickerItems';
//Import Styles
import GlobalStyles from '../../../../globals/GlobalStyles';
import CreateAnimalStyles from '../../../../globals/CreateAnimalStyles';
import { GlobalVariables } from '../../../../globals/GlobalVariable';
//Import Firebase
import { UploadImage } from '../../../../services/FirebaseStorage';
import { createDocumentDB, updateDocumentDb } from '../../../../services/FirebaseCollections';

const CreateBullStepTwo = ({ route, navigation: { goBack, navigate } }) => {

    const [display, setDisplay] = useState('flex'),
        [race, setRace] = useState(''),
        [genetics, setGenetics] = useState(''),
        [origin, setOrigin] = useState(''),
        [colour, setColour] = useState(''),
        [warm, setWarm] = useState(false),
        [cold, setCold] = useState(false),
        [features, setFeatures] = useState('');

    const [pickerRaceItem] = useState(PickerItemsData.PickerRaceItems);
    const [pickerGeneticsItem] = useState(PickerItemsData.PickerGeneticsItems);

    const [pickerElement] = useState({
        race: { topLabel: 'Raza', label: 'Seleccione la raza' },
        genetics: { topLabel: 'Genetica', label: 'Seleccione la genetica' }
    })
    const [inputElement] = useState({
        origin: { topLabel: 'Origen', label: 'Ingrese el origen', handleChange: setOrigin },
        colour: { topLabel: 'Color', label: 'Ingrese el color', handleChange: setColour },
        features: { topLabel: 'Características', label: 'Ingrese las características', handleChange: setFeatures, multiline: true }
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


    const saveNewBull = async () => {
        var climate = '';

        if (warm && cold) {
            climate = 'Calido y Frio';
        } else {
            if (warm) {
                climate = 'Calido';
            } else if (cold) {
                climate = 'Frio';
            }
        }

        var stepOne = route.params.stepOne;
        const dateBirth = firestore.Timestamp.fromDate(new Date(stepOne.birthday)).toDate()
        stepOne.birthday = dateBirth;
        const pickBull = stepOne.image;
        delete stepOne.image;

        const dataBullSave = {
            ...stepOne, race: race, origin: origin, colour: colour, genetics: genetics, typeAnimal: 'bull',
            climate: climate, features: features, createdAt: firestore.FieldValue.serverTimestamp()
        }

        createDocumentDB('bulls', dataBullSave).then(async (uid) => {
            var url = await UploadImage('ImageProfileBull', uid.id, pickBull);
            ImagePicker.cleanSingle(pickBull);

            var imageData = { image: url };
            updateDocumentDb('bulls', imageData, uid.id).then(() => {
                navigate('ListBull');
            })

        })
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyles.mainViewContainer}>
                <View style={[CreateAnimalStyles.headerTopViewContainer, { display }]}>
                    <HeaderTopBar />
                </View>
                <View style={CreateAnimalStyles.bodyViewContainer}>
                    <View style={[CreateAnimalStyles.titleViewContainer, { display }]}>
                        <TitleWithIcon iconBack onPress={() => goBack()} />
                    </View>
                    <View style={[CreateAnimalStyles.bodyFormViewContainer, GlobalStyles.alignCenter]}>
                        <View style={[CreateAnimalStyles.titleFormView, GlobalStyles.alignCenter]}>
                            <Text style={CreateAnimalStyles.textTitleForm}>Raza y caracteristicas</Text>
                        </View>
                        <View style={[CreateAnimalStyles.formViewContainer, GlobalStyles.dropShadowButtons, GlobalStyles.widthStandardContainer]}>
                            <ScrollView >
                                <View style={[CreateAnimalStyles.textInputStepTwoView, CreateAnimalStyles.marginInput]}>
                                    <PickerContain pickerElement={pickerElement.race} selectItem={race} setSelectedItem={setRace}
                                        dataItems={pickerRaceItem} />
                                </View>
                                <View style={[CreateAnimalStyles.textInputStepTwoView, CreateAnimalStyles.marginInput]}>
                                    <PickerContain pickerElement={pickerElement.genetics} selectItem={genetics} setSelectedItem={setGenetics}
                                        dataItems={pickerGeneticsItem} />
                                </View>
                                <View style={[CreateAnimalStyles.textInputStepTwoView, CreateAnimalStyles.marginInput]}>
                                    <ContainInput element={inputElement.origin} />
                                </View>
                                <View style={[CreateAnimalStyles.textInputStepTwoView, CreateAnimalStyles.marginInput, GlobalStyles.flexRow]}>
                                    <View style={[GlobalStyles.flexOneView, CreateAnimalStyles.twoColumInput]}>
                                        <ContainInput element={inputElement.colour} />
                                    </View>
                                    <View style={GlobalStyles.flexOneView}>
                                        <View style={[GlobalStyles.labelView]}>
                                            <Text adjustsFontSizeToFit numberOfLines={1} style={[GlobalStyles.textLabel]}>Seleccione los climas</Text>
                                        </View>
                                        <View style={[GlobalStyles.flexOneView, GlobalStyles.flexRow]}>
                                            <CustomCheckBox label='Calido' onSelect={setWarm} select={warm} />
                                            <CustomCheckBox label='Frio' onSelect={setCold} select={cold} />
                                        </View>
                                    </View>
                                </View>
                                <View style={[CreateAnimalStyles.textInputMultiLine, CreateAnimalStyles.marginInput]}>
                                    <ContainInput element={inputElement.features} />
                                </View>
                                <View style={[CreateAnimalStyles.buttonsViewContainer, GlobalStyles.flexRow, GlobalStyles.alignCenter, CreateAnimalStyles.marginBottomScroll]}>
                                    <View style={GlobalStyles.buttonCancelView}>
                                        <ButtonComponent textButton='Cancelar' backgroundColor='#FFF' textColor='#000' onPress={() => navigate('ListBull')} />
                                    </View>
                                    <View style={GlobalStyles.buttonNextStepView}>
                                        <ButtonComponent textButton='Guardar' backgroundColor={GlobalVariables.ButtonColorGreen} textColor='#FFF'
                                            dropShadow={GlobalStyles.dropShadowButtons} onPress={saveNewBull} />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CreateBullStepTwo;