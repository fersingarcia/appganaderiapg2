import { StyleSheet } from "react-native";
import { GlobalVariables } from '../../globals/GlobalVariable';

export default StyleSheet.create({
    //Styles for Register Step One
    headerViewContainer: {
        flex: 0.8
    },

    bodyViewContainer: {
        flex: 1.2
    },

    textTitleView: {
        flex: 0.7
    },

    textTitleRegister: {
        color: GlobalVariables.MainColorBlack,
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 34
    },

    buttonSocialRegisterMainView: {
        flex: 1.1
    },

    buttonSocialRegisterView: {
        flex: 1.2
    },

    textSocialRegisterView: {
        flex: 0.9,
    },

    textSocialRegister: {
        color: GlobalVariables.MainColorBlack,
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 16
    },

    inputRegisterView: {
        flex: 1.9
    },

    buttonNextStepView: {
        flex: 0.8
    },

    textLoginView: {
        flex: 0.5
    },

    textHaveAccountQuestion: {
        color: GlobalVariables.MainColorBlack,
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 16,
        marginRight: 10
    },

    textLoginButton: {
        color: GlobalVariables.TitleColorGreen,
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 16
    },

    buttonViewContainer: {
        flex: 0.8
    }

})