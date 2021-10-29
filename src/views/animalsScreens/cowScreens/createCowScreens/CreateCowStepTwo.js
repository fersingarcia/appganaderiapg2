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
//Import Firebase
import { UploadImage } from '../../../../services/FirebaseStorage';
import { createDocumentDB, updateDocumentDb } from '../../../../services/FirebaseCollections';
//Import Constants
import { PickerItemsData } from '../../../../constants/PickerItems';
//Import Styles
import GlobalStyles from '../../../../globals/GlobalStyles';
import CreateAnimalStyles from '../../../../globals/CreateAnimalStyles';
import { GlobalVariables } from '../../../../globals/GlobalVariable';

const CreateCowStepTwo = ({ route, navigation: { goBack, navigate } }) => {

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


    const saveNewCow = async () => {

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
        const pickCow = stepOne.image;
        delete stepOne.image;

        const dataCowSave = {
            ...stepOne, race: race, origin: origin, colour: colour, genetics: genetics, typeAnimal: 'cow',
            zealBirth: 0, zealDuration: 0, climate: climate, features: features,
            createdAt: firestore.FieldValue.serverTimestamp()
        }

        createDocumentDB('cows', dataCowSave).then(async (uid) => {
            var url = await UploadImage('ImageProfileCow', uid.id, pickCow);
            ImagePicker.cleanSingle(pickCow);

            var imageData = { image: url };
            updateDocumentDb('cows', imageData, uid.id).then(() => {
                navigate('ListCow');
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
                                        <ButtonComponent textButton='Cancelar' backgroundColor='#FFF' textColor='#000' onPress={() => navigate('ListCow')} />
                                    </View>
                                    <View style={GlobalStyles.buttonNextStepView}>
                                        <ButtonComponent textButton='Guardar' backgroundColor={GlobalVariables.ButtonColorGreen} textColor='#FFF'
                                            dropShadow={GlobalStyles.dropShadowButtons} onPress={saveNewCow} />
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

export default CreateCowStepTwo;