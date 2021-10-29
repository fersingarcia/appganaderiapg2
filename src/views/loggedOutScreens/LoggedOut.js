import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StatusBar, ImageBackground, Animated, ScrollView, useWindowDimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
//Import Components
import ButtonComponent from '../../components/buttons/basicButton/ButtonComponent';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../globals/GlobalStyles';
import { GlobalVariables } from '../../globals/GlobalVariable';

const LoggedOut = ({ navigation: { navigate } }) => {
    const [scrollImageArray, setScrollImageArray] = useState([])
    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();

    useEffect(() => {
        redImageScroll();
    }, []);

    const redImageScroll = async () => {
        var dataImage = []
        const images = await firestore().collection('imageScroll').get().then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                const imgdata = doc.data();
                dataImage.push(imgdata)
            })
        });
        setScrollImageArray(dataImage)
    }

    return (
        <View style={GlobalStyles.mainViewContainer}>
            <StatusBar barStyle='dark-content' translucent backgroundColor='transparent' />
            <View style={[Styles.imageScrollViewContainer]}>
                <View>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: scrollX
                                    }
                                }
                            }
                        ],
                            { useNativeDriver: false })}
                        scrollEventThrottle={1}
                    >
                        {scrollImageArray.map((image, imageIndex) => {
                            return (
                                <View
                                    style={[Styles.imageViewContainer, { width: windowWidth }]}
                                    key={imageIndex}
                                >
                                    <ImageBackground resizeMode='contain' source={{ uri: image.url }} style={Styles.imageScrollView}>
                                    </ImageBackground>
                                    <View style={[GlobalStyles.alignCenter, Styles.legendImage]}>
                                        <Text style={Styles.textLegend}>{image.description}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>

                    <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                        {scrollImageArray.map((image, imageIndex) => {
                            const width = scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1)
                                ],
                                outputRange: [8, 16, 8],
                                extrapolate: "clamp"
                            });
                            return (
                                <Animated.View
                                    key={imageIndex}
                                    style={[Styles.dotImageView, { width }]}
                                />
                            );
                        })}
                    </View>
                </View>
            </View>
            <View style={[Styles.textTitleViewContainer, GlobalStyles.justifyCenter]}>
                <Text adjustsFontSizeToFit style={[Styles.textTitleLogged, GlobalStyles.alignTextCenter]}>El mejor control{'\n'}para la ganadería</Text>
                <Text adjustsFontSizeToFit style={[Styles.textSubtitleLogged, GlobalStyles.alignTextCenter]}>Descubre una mejor forma para{'\n'}organizar las actividades ganaderas</Text>
            </View>
            <View style={[Styles.buttonViewContainer, GlobalStyles.spaceEvenly, GlobalStyles.flexRow]}>
                <View style={GlobalStyles.buttonMediumSize}>
                    <ButtonComponent backgroundColor='#FFF' textButton='Iniciar sesión' textColor={GlobalVariables.MainColorBlack}
                        dropShadow={GlobalStyles.dropShadowButtons} onPress={() => navigate('LoginRoot')} />
                </View>
                <View style={GlobalStyles.buttonMediumSize}>
                    <ButtonComponent backgroundColor={GlobalVariables.ButtonColorGreen} textButton='Registrarse' textColor='#FFF'
                        dropShadow={GlobalStyles.dropShadowButtons} onPress={() => navigate('RegisterRoot')} />
                </View>
            </View>
        </View>
    )
}

export default LoggedOut;