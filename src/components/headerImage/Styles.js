import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
    headerImage: {
        width,
        height: '100%',
        resizeMode: 'stretch'
    }
});