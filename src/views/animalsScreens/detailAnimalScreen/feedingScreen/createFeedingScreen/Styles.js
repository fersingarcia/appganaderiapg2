import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../../../globals/GlobalVariable';

export default StyleSheet.create({
    headerTopViewContainer: {
        flex: .3
    },

    displayTitleOff: {
        flex: 0.1
    },

    bodyViewContainer: {
        flex: 1.7
    },

    titleViewContainer: {
        flex: .1
    },

    bodyFormViewContainer: {
        flex: 1
    },

    titleFormView: {
        flex: .2,
        justifyContent: 'flex-end'
    },

    textTitleForm: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.MainColorBlack,
        fontSize: 24
    },

    formViewContainer: {
        backgroundColor: '#FFF',
        marginBottom: 25,
        borderRadius: 10,
        flex: 1.8
    },

    textInputView: {
        flex: .16,
        marginHorizontal: 15,
    },

    checkBoxView: {
        flex: .16,
        width: '60%',
        marginHorizontal: 15,
    },

    pickerView: {
        flex: .16,
    },

    pickerViewContainer: {
        flex: 1 / 2,
        marginHorizontal: 15,
    },

    buttonsViewContainer: {
        height: '13%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 15
    },

    checkBoxLargeView: {
        flex: 1.5
    },

    itemPicker: {
        fontSize: 15
    },
});