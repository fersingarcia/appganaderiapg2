import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    photoCardContainer: {
        backgroundColor: '#FFF',
        height: '95%',
        width: '95%',
        borderRadius: 10,
        borderColor: GlobalVariables.SubtitleColorGrey,
        borderWidth: .5
    },

    iconViewContainer: {
        backgroundColor: '#FFF',
        width: '45%',
        height: '50%',
        borderRadius: 30,
        borderColor: GlobalVariables.SubtitleColorGrey,
        borderWidth: .5
    },

    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },

    photoView: {
        flex: 1
    },

    textNameView: {
        flex: .5,
        justifyContent: 'flex-end'
    },

    textTitle: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.MainColorBlack,
        fontSize: 30
    },

    textSubtitleView: {
        flex: .5,
        justifyContent: 'center'
    },

    textSubtitleTwoView: {
        flex: .5,
        justifyContent: 'flex-start'
    },

    textSubtitle: {
        fontFamily: GlobalVariables.FontFamilyBold,
        color: GlobalVariables.SubtitleColorGrey,
        fontSize: 18
    },

    iconRightView: {
        paddingRight: 10,
        paddingTop: 10
    }
});