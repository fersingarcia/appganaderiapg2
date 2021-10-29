import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../globals/GlobalVariable';

export default StyleSheet.create({
    tabMainContainer: {
        width: '100%',
        height: '10%'
    },

    bottomTabContainer: {
        borderRadius: 10,
        width: '95%',
        height: '70%',
        backgroundColor: '#FFF'
    },

    touchableView: {
        flex: 1,
    },

    iconViewContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    labelViewContainer: {
        flex: 1,
    },

    labelBackgroundView: {
        position: 'absolute',
        backgroundColor: GlobalVariables.BacgroundLightGreen,
        borderRadius: 5,
        height: '70%',
        width: '95%'
    },

    textLabel: {
        fontSize: 17,
        fontFamily: GlobalVariables.FontFamilyBold
    }
})