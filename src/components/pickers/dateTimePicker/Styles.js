import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    labelInterViewContainer: {
        paddingLeft: 2,
        flex: 1.7
    },

    textLabelInter: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.MainColorBlack,
        fontSize: 14
    },

    iconView: {
        flex: .4
    },

    inputNoLabel: {
        height: '100%',
        backgroundColor: '#FFF',
        borderRadius: 7,
        borderWidth: .6
    }
});