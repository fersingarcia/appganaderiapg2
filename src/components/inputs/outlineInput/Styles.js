import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({

    inputContainer: {
        flex: 1,
        borderBottomWidth: .8,
    },

    inputIconView: {
        flex: .3,
    },

    inputMainView: {
        flex: 1.7
    },

    inputView: {
        flex: 1.8
    },

    textInput: {
        color: GlobalVariables.MainColorBlack,
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 16
    },
    errorIconView: {
        flex: .2,
    }



});