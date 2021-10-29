import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';


export default StyleSheet.create({
    itemFlatListContainer: {
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 10,
        marginVertical: 5,
    },

    imageItemView: {
        flex: .9
    },

    imageItem: {
        borderRadius: 10,
        width: '95%',
        height: '90%'
    },

    textItemView: {
        flex: 1.6,
        paddingLeft: 10
    },

    textTitlteItem: {
        fontFamily: GlobalVariables.FontFamilyMain,
        fontSize: 22,
        color: GlobalVariables.MainColorBlack
    },

    textSubtitleItem: {
        fontSize: 16,
        fontFamily: GlobalVariables.FontFamilyBold,
        color: GlobalVariables.SubtitleColorGrey
    },

    iconFavView: {
        flex: .5
    },
})