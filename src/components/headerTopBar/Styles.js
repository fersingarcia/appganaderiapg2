import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../globals/GlobalVariable';

export default StyleSheet.create({

    container: {
        flex: 1
    },

    imageBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },

    titleViewContainer: {
        flex: 1.5
    },

    iconBarOptionsView: {
        flex: .3,
        marginBottom: '4%'
    },

    titleTopBarView: {
        flex: 1.7,
    },

    textTitleTopBar: {
        fontFamily: GlobalVariables.FontFamilyBold,
        fontSize: 24,
        color: '#FFF'
    },

    imageProfileViewContainer: {
        flex: .5,
        marginRight: '5%',
        alignItems: 'flex-end',
    },

    imageProfile: {
        width: '45%',
        height: '40%',
        borderRadius: 30
    }
});