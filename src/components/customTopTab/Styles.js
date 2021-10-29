import { StyleSheet, Dimensions } from 'react-native';
import { GlobalVariables } from '../../globals/GlobalVariable';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    tabMainContainer: {
        height: '18%'
    },

    tabViewContainer: {
        flex: 1,
        width: '95%'
    },

    filterButtonContainer: {
        flex: 1,
        width: (width / 3)
    },

    filterButtonViewContainer: {
        height: '60%',
        width: '85%',
        borderRadius: 10
    },

    textButtonFilter: {
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 17
    }

});