import React, { useContext, useState, useEffect } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
//Import Styles
import Styles from './Styles';
//Import Images
import Images from '../../assets/images';
//Import ContextUser
import { AuthContext } from '../../navigation/RootNavigation';
import GlobalStyles from '../../globals/GlobalStyles';

import { onSingOut } from '../../services/FirebaseAuth';

export default function HeaderTopBar() {
    const user = useContext(AuthContext);
    const [imageProfile, setImageProfile] = useState(Images.noImageProfile);
    useEffect(() => {
        loadImage();
    }, [])

    const loadImage = () => {
        if (user._data.photoUrl) {
            setImageProfile({ uri: user._data.photoUrl })
        }
    }

    return (
        <View style={[Styles.container, GlobalStyles.flexRow]}>
            <Image style={Styles.imageBackground} source={Images.topHeader} />
            <View style={[Styles.titleViewContainer, GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                <View style={[Styles.iconBarOptionsView, GlobalStyles.alignCenter]}>
                    <TouchableWithoutFeedback>
                        <Icon adjustsFontSizeToFit name='bars' color='#FFF' size={26} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={Styles.titleTopBarView}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={Styles.textTitleTopBar}>Producción Ganadera</Text>
                </View>
            </View>
            <View style={[Styles.imageProfileViewContainer, GlobalStyles.justifyCenter]}>
                <TouchableWithoutFeedback onPress={onSingOut}>
                    <Image source={imageProfile} style={Styles.imageProfile} />
                </TouchableWithoutFeedback>
            </View>
        </View>

    )
}