import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    bottomSheetMainContainer: {
        justifyContent: 'flex-end'
    },

    modalContainer: {
        height: '35%',
        backgroundColor: '#f7f7f7',
        marginHorizontal: 15,
        padding: 15,
        marginBottom: 10,
        borderRadius: 22,
    },

    closeModalViewContainer: {
        flex: .4,
        alignItems: 'flex-end'
    },

    iconCloseModalView: {
        flex: 1
    },

    titleModalViewContainer: {
        flex: .6
    },

    textTitleModal: {
        fontFamily: GlobalVariables.FontFamilyBold,
        color: GlobalVariables.MainColorBlack,
        fontSize: 20
    },

    buttonSelectPickViewContainer: {
        marginVertical: 10,
        borderRadius: 12,
        backgroundColor: '#FFF'
    },

    iconPickView: {
        flex: .5
    },

    textButtonPickView: {
        flex: 1.5,
        alignItems: 'flex-start'
    },

    textButtonPick: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.MainColorBlack,
        fontSize: 18
    }
});