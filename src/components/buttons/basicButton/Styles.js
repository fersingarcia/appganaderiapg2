import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    buttonViewContent: {
        flex: 1,
        borderRadius: 8
    },

    textButton: {
        textAlign: 'center',
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 22
    }
});