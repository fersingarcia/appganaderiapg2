import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    dataPanelMainContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 10,
    },

    rowInfoViewContainer: {
        paddingHorizontal: 25,
        borderColor: GlobalVariables.TitleColorGrey,
        borderBottomWidth: .5,
    },
    rowSubtitleView: {
        flexDirection: 'row-reverse'
    },

    iconView: {
        paddingLeft: 10
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

});