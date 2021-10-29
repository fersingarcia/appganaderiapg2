import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//Import Auth
import { createUserInFirestore } from '../../services/FirebaseAuth';
//Import Styles
import GlobalStyles from '../../globals/GlobalStyles';
import Styles from './Styles';
//Import Components
import HeaderImage from '../../components/headerImage/HeaderImage';
import ButtonComponent from '../../components/buttons/basicButton/ButtonComponent';
import OutlineInput from '../../components/inputs/outlineInput/OutlineInput';
import BasicPicker from '../../components/pickers/basicPicker/BasicPicker';
import { GlobalVariables } from '../../globals/GlobalVariable';


const RegisterStepTwo = ({ route, navigation: { navigate } }) => {

    const { stepOneData } = route.params;

    const [display, setDisplay] = useState('flex'),
        [name, setName] = useState(''),
        [departament, setDepartament] = useState(''),
        [selectDepartament, setSelectDepartament] = useState(''),
        [town, setTown] = useState(),
        [selectTown, setSelecteTown] = useState(),
        [inputElement, setInputElement] = useState({
            nameInput: {
                label: 'Nombre completo', colorIcon: GlobalVariables.MainColorBlack, nameIcon: 'account', typeIcon: 'material-community',
                keyboard: 'default', handleChange: setName, enablePassword: false, errorIconDisplay: false
            }
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

    useEffect(() => {
        readDepartaments();
    }, []);

    useEffect(() => {
        if (selectDepartament) {
            departament.map((item) => {
                if (item.name === selectDepartament) {
                    let mapData = Object.values(item.towns).reverse();
                    setTown(mapData)
                }
            })
        }
    }, [selectDepartament]);

    const readDepartaments = async () => {
        var dataDepartament = []
        const departaments = await firestore().collection('geoLocation').get().then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                const depData = doc.data();
                dataDepartament.push(depData)
            })
        });
        setDepartament(dataDepartament)
    }


    const registerAccount = () => {
        if (name != '' & departament != '' & town != '') {
            var dataRegister = {
                ...stepOneData,
                name: name,
                departament: selectDepartament,
                town: selectTown,
                photoUrl: null
            }
            try {
                auth()
                    .createUserWithEmailAndPassword(dataRegister.email, dataRegister.password)
                    .then(function (data) {
                        delete dataRegister.password;
                        createUserInFirestore(data, dataRegister)

                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                        }

                        if (error.code === 'auth/invalid-email') {
                        }

                        console.error(error);
                    });
            } catch (error) {
            }
        } else {
        }
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyles.mainViewContainer}>
                <View style={[Styles.headerViewContainer, { display }]}>
                    <HeaderImage />
                </View>

                {display === 'none' ?
                    <View style={{ flex: 0.2 }}>
                    </View>
                    : <></>
                }

                <View style={Styles.bodyViewContainer}>
                    <View style={Styles.textTitleView}>
                        <View style={[GlobalStyles.flexOneView, GlobalStyles.justifyCenter]}>
                            <Text adjustsFontSizeToFit style={[Styles.textTitleRegister, GlobalStyles.paddingStandardLeft]}>Registrarse</Text>
                        </View>
                    </View>
                    <View style={[Styles.inputRegisterView, GlobalStyles.alignCenter]}>
                        <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandard]}>
                            <OutlineInput element={inputElement.nameInput} />
                        </View>
                        <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandard]}>
                            <BasicPicker selectItem={selectDepartament} setSelectedItem={setSelectDepartament} dataItems={departament}
                                labelText='Seleccione el Departamento' nameIcon='home' sizeIcon={20} />
                        </View>
                        <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandard]}>
                            <BasicPicker selectItem={selectTown} setSelectedItem={setSelecteTown} dataItems={town}
                                labelText='Seleccione el Municipio' nameIcon='home' sizeIcon={20} />
                        </View>
                    </View>
                    <View style={[Styles.buttonViewContainer, GlobalStyles.spaceEvenly, GlobalStyles.flexRow]}>
                        <View style={GlobalStyles.buttonMediumSize}>
                            <ButtonComponent backgroundColor='#FFF' textButton='Regresar' dropShadow={GlobalStyles.dropShadowButtons}
                                textColor={GlobalVariables.MainColorBlack} onPress={() => navigate('RegisterStepOneScreen')} />
                        </View>
                        <View style={GlobalStyles.buttonMediumSize}>
                            <ButtonComponent backgroundColor={GlobalVariables.ButtonColorGreen} textButton='Registrarse'
                                dropShadow={GlobalStyles.dropShadowButtons} textColor='#FFF' onPress={registerAccount} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default RegisterStepTwo;