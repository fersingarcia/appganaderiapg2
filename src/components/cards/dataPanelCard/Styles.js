import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    dataPanelMainContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 5,
    },

    rowInfoViewContainer: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderColor: GlobalVariables.TitleColorGrey,
        borderBottomWidth: .5,
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


    textTitleCollaps: {
        fontFamily: GlobalVariables.FontFamilyBold,
        color: GlobalVariables.MainColorBlack,
        fontSize: 14
    },

    textSubtitleCollaps: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.SubTitleBlack,
        fontSize: 14
    },

    iconCollapsView: {
        flex: .2,
        alignItems: 'flex-end'
    },

    collapsViewContainer: {
        width: '100%',
        marginVertical: 5,
        backgroundColor: GlobalVariables.BacgroundCollapsGreen,
        borderRadius: 10,
        padding: 15
    },

    collapsItemView: {
        paddingVertical: 3
    }
})