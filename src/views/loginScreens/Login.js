import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
//Import Auth
import { onGoogleButtonPress, signInEmailPassword } from '../../services/FirebaseAuth';
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

const Login = ({ navigation: { navigate } }) => {

    const [display, setDisplay] = useState('flex'),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [inputElement, setInputElement] = useState({
            emailInput: {
                label: 'Correo electrónico', colorIcon: GlobalVariables.MainColorBlack, nameIcon: 'at',
                keyboard: 'email-address', handleChange: setEmail, enablePassword: false, errorIconDisplay: false
            },
            passwordInput: {
                label: 'Contraseña', colorIcon: GlobalVariables.MainColorBlack, nameIcon: 'lock',
                handleChange: setPassword, enablePassword: true, errorIconDisplay: false
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


    const userLogin = () => {
        if (email != '' & password != '') {
            try {
                signInEmailPassword(email, password)
            } catch (error) {

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
                    <View style={{ flex: 0.1 }}>
                    </View>
                    : <></>
                }
                <View style={[Styles.bodyViewContainer]}>
                    <View style={Styles.textTitleView}>
                        <View style={[GlobalStyles.flexOneView]}>
                            <Text adjustsFontSizeToFit style={[Styles.textTitleWelcome, GlobalStyles.paddingStandardLeft]}>Bienvenido</Text>
                        </View>
                        <View style={[GlobalStyles.flexOneView]}>
                            <Text adjustsFontSizeToFit style={[Styles.textDirections, GlobalStyles.paddingStandardLeft]}>Para continuar ingrese su correo y contraseña.</Text>
                        </View>
                    </View>
                    <View style={[Styles.inputLoginViewContainer, GlobalStyles.spaceEvenly, GlobalStyles.alignCenter]}>
                        <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandard]}>
                            <OutlineInput element={inputElement.emailInput} />
                        </View>
                        <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandard]}>
                            <OutlineInput element={inputElement.passwordInput} />
                        </View>
                    </View>
                    <View style={[Styles.forgotPasswordTextView, GlobalStyles.justifyCenter]}>
                        <Text onPress={() => navigate('ForgotPassword')} style={[Styles.textForgotPassword, GlobalStyles.paddingStandardRight]}>¿Olvidó su contraseña?</Text>
                    </View>
                    <View style={[Styles.buttonLoginViewContainer, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                        <View style={[GlobalStyles.heightStandard, GlobalStyles.widthStandard]}>
                            <ButtonComponent backgroundColor={GlobalVariables.ButtonColorGreen} textButton='Iniciar sesión'
                                dropShadow={GlobalStyles.dropShadowButtons} textColor='#FFF' onPress={userLogin} />
                        </View>
                    </View>
                    <View style={[Styles.buttonSocialLoginMainView, GlobalStyles.justifyCenter, { display }]}>
                        <View style={[Styles.textSocialLoginView, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                            <Text style={Styles.textSocialLogin}>O inicie sesión con...</Text>
                        </View>
                        <View style={[Styles.buttonSocialLoginView, GlobalStyles.spaceEvenly, GlobalStyles.flexRow]}>
                            <SocialButton icon={Images.logoFb} />
                            <SocialButton icon={Images.logoGoogle} onPress={() => onGoogleButtonPress().then(() => { })} />
                        </View>
                    </View>
                    <View style={[Styles.textRegisterView, GlobalStyles.flexRow, GlobalStyles.justifyCenter, GlobalStyles.alignCenter, { display }]}>
                        <Text style={Styles.textAccountQuestion}>¿No tienes una cuenta?</Text>
                        <Text onPress={() => navigate('RegisterRoot')} style={Styles.textRegisterButton}>Registrarse</Text>
                    </View>
                    {display === 'none' ?
                        <View style={{ flex: 0.4 }}>
                        </View>
                        : <></>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login;