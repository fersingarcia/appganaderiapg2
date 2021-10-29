import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../globals/GlobalVariable';


export default StyleSheet.create({
    headerViewContainer: {
        flex: 0.8
    },

    bodyViewContainer: {
        flex: 1.2
    },

    textTitleView: {
        flex: 1.3
    },

    textTitleWelcome: {
        height: '100%',
        color: GlobalVariables.MainColorBlack,
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 34
    },

    textDirections: {
        height: '100%',
        color: GlobalVariables.MainColorBlack,
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 16,
        marginRight: '10%'
    },

    inputLoginViewContainer: {
        flex: 1.6
    },

    forgotPasswordTextView: {
        flex: 0.5
    },

    textForgotPassword: {
        color: GlobalVariables.TitleColorGreen,
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 14,
        textAlign: 'right'
    },

    buttonLoginViewContainer: {
        flex: 0.9
    },

    buttonLoginView: {
        height: '70%'
    },

    buttonSocialLoginMainView: {
        flex: 1.2
    },

    textSocialLoginView: {
        flex: 0.9
    },

    textSocialLogin: {
        color: GlobalVariables.MainColorBlack,
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 16
    },

    buttonSocialLoginView: {
        flex: 1.1
    },

    textRegisterView: {
        flex: 0.5,
    },


    textAccountQuestion: {
        color: GlobalVariables.MainColorBlack,
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 16,
        marginRight: 10
    },

    textRegisterButton: {
        color: GlobalVariables.TitleColorGreen,
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 16
    }
});
