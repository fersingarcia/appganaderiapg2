import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../globals/GlobalVariable';

export default StyleSheet.create({
    imageScrollViewContainer: {
        flex: 1.5,
        flexDirection: 'column-reverse'
    },

    imageViewContainer: {
        height: 250
    },

    imageScrollView: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: "hidden",
    },

    legendImage: {
        paddingTop: 20
    },

    textLegend: {
        fontSize: 18,
        fontFamily: GlobalVariables.FontFamilyMain
    },

    dotImageView: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "#a7a7a7",
        marginHorizontal: 4
    },

    textTitleViewContainer: {
        flex: 1.1,
    },

    textTitleLogged: {
        fontFamily: GlobalVariables.FontFamilyBold,
        color: GlobalVariables.TitleColorGreen,
        fontSize: 36
    },

    textSubtitleLogged: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.MainColorBlack,
        fontSize: 18,
        marginTop: 30
    },

    buttonViewContainer: {
        flex: 0.4
    }
});
