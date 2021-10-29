import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    menuButtonMainContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 15
    },

    imageViewContainer: {
        flex: 1.4
    },

    imageButton: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },

    textButtonViewContainer: {
        flex: .6,
        alignItems: 'center'
    },

    textTitleButton: {
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 26
    }
});