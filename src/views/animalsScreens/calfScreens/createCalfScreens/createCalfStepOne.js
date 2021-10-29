import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
//Import Components
import HeaderTopBar from '../../../../components/headerTopBar/HeaderTopBar';
import TitleWithIcon from '../../../../components/titleWithIcon/TitleWithIcon';
import DetailCard from '../../../../components/cards/detailCard/DetailCard';
import ContainInput from '../../../../components/inputs/containInput/ContainInput';
import PickerContain from '../../../../components/pickers/basicPickerContain/PickerContain';
import DateTimePickerBasic from '../../../../components/pickers/dateTimePicker/DateTimePicker';
import ButtonComponent from '../../../../components/buttons/basicButton/ButtonComponent';
import TakePickBottomSheet from '../../../../components/bottomSheet/takePickBottomSheet/TakePickBottomSheet';
import SelectParentsModal from '../../../../components/modals/selectParentsModal/SelectParentsModal';
//Import Constants
import { PickerItemsData } from '../../../../constants/PickerItems';
//Import Styles
import GlobalStyles from '../../../../globals/GlobalStyles';
import CreateAnimalStyles from '../../../../globals/CreateAnimalStyles';
import { GlobalVariables } from '../../../../globals/GlobalVariable';

const CreateCalfStepOne = ({ navigation: { goBack, navigate } }) => {

    const [display, setDisplay] = useState('flex'),
        [searchParent, setSearchParent] = useState(''),
        [listParents, setListParents] = useState([]),
        [isLoading, setIsLoading] = useState(false),
        [totalParents, setTotalParents] = useState(0),
        [startParents, setStartParents] = useState(null),

        [showBottomSheet, setShowBottomSheet] = useState(false),
        [showParentsModal, setShowParentsModal] = useState(false),
        [showDatePicker, setShowDatePicker] = useState(false),
        [imagePickCalf, setImagePickCalf] = useState(null),
        [uploadPickCalf, setUploadPickCalf] = useState(''),
        [parentCond, setParentCond] = useState(false),
        [parentLoad, setParentLoad] = useState(''),
        [nameCalf, setNameCalf] = useState(''),
        [idMomCalf, setIdMomCalf] = useState(''),
        [momCalf, setMomCalf] = useState('Seleccione la madre'),
        [idDadCalf, setIdDadCalf] = useState(''),
        [dadCalf, setDadCalf] = useState('Seleccione el padre'),
        [code, setCode] = useState(''),
        [gender, setGender] = useState(''),
        [birthday, setBirthday] = useState('');

    const limitListParents = 5;

    const [pickerGenderItem] = useState(PickerItemsData.PickerGenderItems);

    const [inputElement] = useState({
        nameCalf: { topLabel: 'Nombre del ternero', label: 'Ingrese nombre del ternero', handleChange: setNameCalf },
        codeCalf: { topLabel: 'Código', label: 'Ingrese el código', handleChange: setCode },
        searchParent: { label: 'Buscar pariente', handleChange: setSearchParent }
    });

    const [pickerElement, setPickerElement] = useState({
        momCalf: { topLabel: 'Madre', label: 'Seleccione la madre' },
        dadCalf: { topLabel: 'Padre', label: 'Seleccione el padre' },
        gender: { topLabel: 'Genero', label: 'Seleccione el genero' }
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

    const selecParentCalf = (collection) => {
        if (collection === 'cows') {
            setParentCond(true)
            setParentLoad('cows')
        } else {
            setParentLoad('bulls')
        }
        firestore().collection(collection).get().then((querySnapshot) => {
            setTotalParents(querySnapshot.size);
        });

        const resultParents = [];

        firestore().collection(collection).orderBy('createdAt', 'desc').limit(limitListParents).get().then((response) => {
            setStartParents(response.docs[response.docs.length - 1])

            response.forEach((doc) => {
                const parents = doc.data();
                parents.id = doc.id;
                resultParents.push(parents);
            });
            setListParents(resultParents);
            setShowParentsModal(true);
        })
    }

    const handleLoadMore = () => {
        const resultParents = [];
        listParents.length < totalParents && setIsLoading(true);
        firestore().collection(parentLoad).orderBy("createdAt", "desc").startAfter(startParents.data().createdAt)
            .limit(limitListParents).get().then((response) => {
                if (response.docs.length > 0) {
                    setStartParents(response.docs[response.docs.length - 1]);
                } else {
                    setIsLoading(false);
                }
                response.forEach((doc) => {
                    const parents = doc.data();
                    parents.id = doc.id;
                    resultParents.push(parents);
                });
                setListParents([...listParents, ...resultParents]);
            });
    };

    const saveParentSelect = () => {
        setPickerElement({
            momCalf: {
                ...pickerElement.momCalf,
                label: momCalf
            },
            dadCalf: {
                ...pickerElement.dadCalf,
                label: dadCalf
            },
            gender: {
                ...pickerElement.gender
            }
        });
        setShowParentsModal(false);
        setParentCond(false);

    }

    const nextStep = async () => {
        var stepOneData = {
            name: nameCalf, code: code, favorite: false, birthday: birthday.toString(), idMomCalf: idMomCalf,
            momCalf: momCalf, dadCalf: dadCalf, idDadCalf: idDadCalf, gender: gender, image: uploadPickCalf
        }

        navigate('CreateCalfStepTwo', { stepOne: stepOneData })
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
                            <Text style={CreateAnimalStyles.textTitleForm}>Información del ternero</Text>
                        </View>
                        <View style={[CreateAnimalStyles.formViewContainer, GlobalStyles.dropShadowButtons, GlobalStyles.widthStandardContainer]}>
                            <ScrollView>
                                <View style={CreateAnimalStyles.detailCardView}>
                                    <DetailCard onPress={() => setShowBottomSheet(true)} imageProfile={imagePickCalf} title={nameCalf}
                                        subTitle={'Codigo: ' + code} />
                                </View>
                                <View style={CreateAnimalStyles.textInputView}>
                                    <ContainInput element={inputElement.nameCalf} />
                                </View>
                                <View style={[CreateAnimalStyles.textInputView, GlobalStyles.flexRow]}>
                                    <View style={[GlobalStyles.flexOneView, CreateAnimalStyles.twoColumInput]}>
                                        <ContainInput element={inputElement.codeCalf} />
                                    </View>
                                    <View style={GlobalStyles.flexOneView}>
                                        <DateTimePickerBasic setShowDatePicker={setShowDatePicker} showDatePicker={showDatePicker}
                                            setDate={setBirthday} date={birthday} topLabel='Fecha de nacimiento' label='Seleccione fecha' />
                                    </View>
                                </View>
                                <View style={CreateAnimalStyles.textInputView}>
                                    <PickerContain pickerElement={pickerElement.momCalf} selectItem={momCalf} setSelectedItem={setMomCalf}
                                        onPress={() => selecParentCalf('cows')} enabled={false} />
                                </View>
                                <View style={CreateAnimalStyles.textInputView}>
                                    <PickerContain pickerElement={pickerElement.dadCalf} selectItem={dadCalf} setSelectedItem={setDadCalf}
                                        onPress={() => selecParentCalf('bulls')} enabled={false} />
                                </View>
                                <View style={CreateAnimalStyles.textInputView}>
                                    <PickerContain pickerElement={pickerElement.gender} selectItem={gender} setSelectedItem={setGender}
                                        dataItems={pickerGenderItem} />
                                </View>
                                <View style={[CreateAnimalStyles.buttonsViewContainer, GlobalStyles.flexRow, GlobalStyles.alignCenter, CreateAnimalStyles.marginBottomScroll]}>
                                    <View style={GlobalStyles.buttonCancelView}>
                                        <ButtonComponent textButton='Cancelar' backgroundColor='#FFF' textColor='#000' onPress={() => goBack()} />
                                    </View>
                                    <View style={GlobalStyles.buttonNextStepView}>
                                        <ButtonComponent textButton='Continuar' backgroundColor={GlobalVariables.ButtonColorGreen} textColor='#FFF'
                                            dropShadow={GlobalStyles.dropShadowButtons} onPress={nextStep} />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <TakePickBottomSheet setUploadImage={setUploadPickCalf} setImagePath={setImagePickCalf} isVisible={showBottomSheet}
                    setIsVisible={setShowBottomSheet} />
                <SelectParentsModal isVisible={showParentsModal} setIsVisible={setShowParentsModal} searchElement={inputElement.searchParent}
                    listItems={listParents} handleLoadMore={handleLoadMore} isLoading={isLoading} setIdParent={parentCond ? setIdMomCalf : setIdDadCalf}
                    setNameParent={parentCond ? setMomCalf : setDadCalf} onSave={saveParentSelect} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CreateCalfStepOne;