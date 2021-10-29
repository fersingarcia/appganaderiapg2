import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    modalContainer: {
        height: 500,
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
        flex: 1.7
    },

    searchInputModalView: {
        height: '15%'
    },

    flatListParentsView: {
        flex: 1,
        marginTop: 10
    },

    buttonsView: {
        flex: .3,
        justifyContent: 'flex-end'
    }
});