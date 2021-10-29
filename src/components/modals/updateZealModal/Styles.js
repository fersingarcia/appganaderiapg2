import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    modalContainer: {
        height: 300,
        backgroundColor: '#FFF',
        marginHorizontal: 15,
        padding: 20,
        borderRadius: 10,
    },

    textTitleModal: {
        fontFamily: GlobalVariables.FontFamilyBold,
        color: GlobalVariables.MainColorBlack,
        fontSize: 18
    },


    bodyModal: {
        flex: 1.5
    },

    inputsView: {
        paddingVertical: 5,
        flex: 1,
    },

    buttonsView: {
        flex: .5,
        justifyContent: 'flex-end'
    }
})