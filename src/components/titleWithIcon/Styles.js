import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../globals/GlobalVariable';

export default StyleSheet.create({
    titleWithIConMainContainer: {
        flex: 1
    },

    iconViewContainer: {
        flex: .3,
        marginLeft: 10
    },

    notIconView: {
        flex: .1
    },

    iconView: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: GlobalVariables.ButtonColorGrey
    },

    textTitleViewContainer: {
        flex: 1.7
    },

    textTitle: {
        color: GlobalVariables.TitleColorGreen,
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 28,
    }
});