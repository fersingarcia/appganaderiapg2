import React from 'react';
import { Image } from 'react-native';
//Import Styles
import Styles from './Styles';
//Import Images
import Images from '../../assets/images';

export default function HeaderImage() {
    return (
        <Image style={Styles.headerImage} source={Images.header} />
    );
}
