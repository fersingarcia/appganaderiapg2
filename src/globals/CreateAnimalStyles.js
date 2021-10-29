import { StyleSheet } from 'react-native';
import { GlobalVariables } from './GlobalVariable';

export default StyleSheet.create({
    //Generic Styles
    headerTopViewContainer: {
        flex: .3
    },

    displayTitleOff: {
        flex: 0.1
    },

    bodyViewContainer: {
        flex: 1.7
    },

    bodyFormViewContainer: {
        flex: 1.8
    },

    titleViewContainer: {
        flex: .2
    },

    textTitleForm: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.MainColorBlack,
        fontSize: 24
    },

    titleFormView: {
        flex: .2,
        justifyContent: 'flex-end'
    },

    formViewContainer: {
        backgroundColor: '#FFF',
        marginBottom: 25,
        borderRadius: 10,
        flex: 1.8
    },

    textInputView: {
        flex: .26,
        marginHorizontal: 15,
    },

    textInputStepTwoView: {
        flex: .6,
        marginHorizontal: 15
    },

    marginInput: {
        marginVertical: 5
    },

    buttonsViewContainer: {
        height: '12%',
        justifyContent: 'flex-end',
        paddingHorizontal: 15
    },

    marginBottomScroll: {
        marginBottom: 80,
    },

    firstColumnView: {
        flex: .7
    },

    twoColumInput: {
        paddingRight: 10
    },

    //Step One Styles
    detailCardView: {
        marginTop: 10,
        marginHorizontal: 15,
        height: '22%'
    },
    photoView: {
        height: '26%'
    },

    textNameCow: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.MainColorBlack,
        fontSize: 30
    },

    textSubtitle: {
        fontFamily: GlobalVariables.FontFamilyBold,
        color: GlobalVariables.SubtitleColorGrey,
        fontSize: 18
    },

    iconHeartView: {
        paddingRight: 10,
        paddingTop: 10
    },
    //Step Two Styles
    textInputMultiLine: {
        height: '20%',
        marginHorizontal: 15
    },
});