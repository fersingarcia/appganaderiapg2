import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    loaderItems: {
        marginTop: 10,
        marginBottom: 10
    },

    textFooter: {
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 16,
        color: GlobalVariables.MainColorBlack
    },

    imageItemView: {
        flex: .9
    },

    imageItem: {
        borderRadius: 10,
        width: '95%',
        height: '90%'
    },

    textItemView: {
        flex: 1.6,
        paddingLeft: 10
    },

    textTitlteItem: {
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 26,
        color: GlobalVariables.MainColorBlack
    },

});