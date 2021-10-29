import { StyleSheet, Dimensions } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    filterButtonContainer: {
        width: (width / 3)
    },

    filterButtonViewContainer: {
        height: '60%',
        width: '85%',
        backgroundColor: '#FFF',
        borderRadius: 10
    },

    textButtonFilter: {
        fontFamily: GlobalVariables.FontFamilyBold,
        color: GlobalVariables.TitleColorGrey,
        fontSize: 17
    }
});