import { StyleSheet } from 'react-native';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default StyleSheet.create({
    fabContainer: {
        backgroundColor: GlobalVariables.ButtonColorGreen,
        position: 'absolute',
        width: 55,
        height: 55,
        bottom: 0,
        right: 20,
        borderRadius: 30,
        zIndex: 1
    }
})