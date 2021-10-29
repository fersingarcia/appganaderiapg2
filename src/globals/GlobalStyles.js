import { StyleSheet } from 'react-native';
import { GlobalVariables } from './GlobalVariable';

export default StyleSheet.create({
    mainViewContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },

    flexOneView: {
        flex: 1
    },

    alignTextCenter: {
        textAlign: 'center'
    },

    justifyCenter: {
        justifyContent: 'center'
    },

    spaceEvenly: {
        justifyContent: 'space-evenly'
    },

    alignCenter: {
        alignItems: 'center'
    },

    flexRow: {
        flexDirection: 'row'
    },

    dropShadowButtons: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },

    dropShadowBottomTab: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 1.80,
        elevation: 3,
    },

    paddingStandardLeft: {
        paddingLeft: '10%'
    },

    paddingStandardRight: {
        paddingRight: '10%'
    },

    widthStandardContainer: {
        width: '95%'
    },
    widthStandard: {
        width: '85%'
    },

    heightStandard: {
        height: '70%'
    },

    buttonMediumSize: {
        width: '43%',
        height: '50%'
    },

    buttonCancelView: {
        width: '40%',
        height: '70%'
    },

    buttonNextStepView: {
        width: '50%',
        height: '70%'
    },

    backgroundTransparent: {
        flex: 1,
        backgroundColor: 'rgba(0.5, 0.25, 0, 0.3)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    //Styles for Inputs with label
    labelView: {
        height: '32%',
        justifyContent: 'flex-end'
    },

    textLabel: {
        fontFamily: GlobalVariables.FontFamilyMain,
        color: GlobalVariables.MainColorBlack,
        fontSize: 16
    },

    inputView: {
        height: '68%',
        backgroundColor: '#FFF',
        borderRadius: 7,
        borderWidth: .6
    },


    //Styles for Animals Lists Main
    headerTopViewContainer: {
        flex: .3
    },

    bodyViewContainer: {
        flex: 1.7
    },

    titleViewContainer: {
        flex: .2
    },

    listCowBodyViewContainer: {
        flex: 1.8
    },

    searchInputViewContainer: {
        flex: .33
    },

    filterButtonsViewContainer: {
        flex: .4
    },

    flatListViewContainer: {
        flex: 2.3
    },


});