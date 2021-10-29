import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StatusBar, Keyboard } from 'react-native';
//Import Auth
import { onGoogleButtonPress, createUserInFirestore } from '../../services/FirebaseAuth';
//Import Images
import Images from '../../assets/images';
//Import Styles
import GlobalStyles from '../../globals/GlobalStyles';
import Styles from './Styles';
//Import Components
import HeaderImage from '../../components/headerImage/HeaderImage';
import ButtonComponent from '../../components/buttons/basicButton/ButtonComponent';
import SocialButton from '../../components/buttons/socialButton/SocialButton';
import OutlineInput from '../../components/inputs/outlineInput/OutlineInput';
import { GlobalVariables } from '../../globals/GlobalVariable';

const RegisterStepOne = ({ navigation: { navigate } }) => {

    const [display, setDisplay] = useState('flex'),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [confirmPassword, setConfirmPassword] = useState(''),
        [inputElement, setInputElement] = useState({
            emailInput: {
                label: 'Correo electrónico', colorIcon: GlobalVariables.MainColorBlack, nameIcon: 'at',
                keyboard: 'email-address', handleChange: setEmail, enablePassword: false, errorIconDisplay: false
            },
            passwordInput: {
                label: 'Contraseña', colorIcon: GlobalVariables.MainColorBlack, nameIcon: 'lock',
                handleChange: setPassword, enablePassword: true, errorIconDisplay: false
            },
            passwordConfirmInput: {
                label: 'Confirmar contraseña', colorIcon: GlobalVariables.MainColorBlack, nameIcon: 'lock',
                handleChange: setConfirmPassword, enablePassword: true, errorIconDisplay: false
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

    const clearErrorMessage = () => {
        setInputElement({
            emailInput: {
                ...inputElement.emailInput,
                errorIconDisplay: false
            },
            passwordInput: {
                ...inputElement.passwordInput,
                errorIconDisplay: false
            },
            passwordConfirmInput: {
                ...inputElement.passwordConfirmInput,
                errorIconDisplay: false
            }
        })
    }

    const registerWithGoogle = () => {
        onGoogleButtonPress().then(function (data) {
            if (data.additionalUserInfo.isNewUser) {
                var dataRegister = {
                    email: data.user.email,
                    name: data.user.displayName,
                    photoUrl: data.user.photoURL
                }
                createUserInFirestore(data, dataRegister)
            }
        })
    }

    const nextStepRegister = () => {
        if (email != '' && password != '' && confirmPassword != '') {
            if (password === confirmPassword) {
                var stepOneData = {
                    email: email,
                    password: password
                }
                navigate('RegisterStepTwoScreen', { stepOneData })
            } else {
            }
        } else {

        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyles.mainViewContainer}>
                <StatusBar translucent backgroundColor='transparent' />
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
                    <View style={[Styles.buttonSocialRegisterMainView, { display }]}>
                        <View style={[GlobalStyles.flexRow, GlobalStyles.spaceEvenly, Styles.buttonSocialRegisterView]}>
                            <SocialButton icon={Images.logoFb} />
                            <SocialButton icon={Images.logoGoogle} onPress={registerWithGoogle} />
                        </View>
                        <View style={[Styles.textSocialRegisterView, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                            <Text style={Styles.textSocialRegister}>O registrese con su correo...</Text>
                        </View>
                    </View>
                    <View style={[Styles.inputRegisterView, GlobalStyles.spaceEvenly, GlobalStyles.alignCenter]}>
                        <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandard]}>
                            <OutlineInput element={inputElement.emailInput} />
                        </View>
                        <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandard]}>
                            <OutlineInput element={inputElement.passwordInput} />
                        </View>
                        <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandard]}>
                            <OutlineInput element={inputElement.passwordConfirmInput} />
                        </View>
                    </View>
                    <View style={[Styles.buttonNextStepView, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                        <View style={[GlobalStyles.heightStandard, GlobalStyles.widthStandard]}>
                            <ButtonComponent backgroundColor={GlobalVariables.ButtonColorGreen} textButton='Continuar'
                                dropShadow={GlobalStyles.dropShadowButtons} textColor='#FFF' onPress={nextStepRegister} />
                        </View>
                    </View>
                    <View style={[Styles.textLoginView, GlobalStyles.flexRow, GlobalStyles.justifyCenter, GlobalStyles.alignCenter, { display }]}>
                        <Text style={Styles.textHaveAccountQuestion}>¿Ya tienes una cuenta?</Text>
                        <Text onPress={() => navigate('LoginRoot')} style={Styles.textLoginButton}>Iniciar sesión</Text>
                    </View>
                    {display === 'none' ?
                        <View style={{ flex: 0.5 }}>
                        </View>
                        : <></>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default RegisterStepOne;