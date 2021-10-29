import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    cardMainContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        borderRadius: 10
    },

    textTitleCard: {
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 18,
        color: GlobalVariables.MainColorBlack
    },

    rowInfoViewContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    rowSubtitleView: {
        flexDirection: 'row-reverse'
    },

    textTitleRow: {
        fontFamily: GlobalVariables.FontFamilyBold,
        color: GlobalVariables.MainColorBlack,
        fontSize: 16
    },

    textSubtitleRow: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.SubTitleBlack,
        fontSize: 16
    },

    internalViewContainer: {
        height: '80%',
        backgroundColor: GlobalVariables.BacgroundCollapsGreen,
        borderRadius: 10,
        padding: 15
    },

    loaderItems: {
        marginTop: 10,
        marginBottom: 10
    }
})