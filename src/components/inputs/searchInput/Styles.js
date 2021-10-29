import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({

    searchInputContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 10
    },

    iconSearchViewContainer: {
        flex: .3
    },

    textInputSearchViewContainer: {
        flex: 1.7
    },

    textInputSearch: {
        color: GlobalVariables.MainColorBlack,
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 18
    }
});