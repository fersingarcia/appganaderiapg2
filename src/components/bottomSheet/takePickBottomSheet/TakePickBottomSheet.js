import React from 'react';
import { View, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default function TakePickBottomSheet({ setUploadImage, isVisible, setIsVisible, setImagePath }) {

    const takePickGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            includeBase64: true
        }).then(image => {
            setUploadImage(image.path)
            setImagePath(`data:image/png;base64,${image.data}`);
        }).catch((e) => console.log('Captura Cancelada, Captura de Fotografía Cancelada'));
        setIsVisible(false)
    }

    const takePickCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            includeBase64: true
        }).then(image => {
            setUploadImage(image.path)
            setImagePath(`data:image/png;base64,${image.data}`);
        }).catch((e) => console.log('Captura Cancelada, Captura de Fotografía Cancelada'));
        setIsVisible(false);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}
            onRequestClose={() => { setIsVisible(!isVisible); }}>
            <View style={GlobalStyles.backgroundTransparent}>
                <View style={[Styles.bottomSheetMainContainer, GlobalStyles.flexOneView]}>
                    <View style={[Styles.modalContainer]}>
                        <View style={Styles.closeModalViewContainer}>
                            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                                <View style={Styles.iconCloseModalView}>
                                    <Icon adjustsFontSizeToFit name='close' color={GlobalVariables.WarningColorRed} size={36} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[Styles.titleModalViewContainer, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                            <View>
                                <Text style={[Styles.textTitleModal]}>Fotografía del animal</Text>
                            </View>
                        </View>
                        <TouchableWithoutFeedback onPress={takePickCamera}>
                            <View style={[Styles.buttonSelectPickViewContainer, GlobalStyles.flexOneView, GlobalStyles.dropShadowButtons, GlobalStyles.flexRow]}>
                                <View style={[Styles.iconPickView, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                                    <Icon adjustsFontSizeToFit name='camera' color={GlobalVariables.SubtitleColorGrey} size={38} />
                                </View>
                                <View style={[Styles.textButtonPickView, GlobalStyles.justifyCenter]}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={[Styles.textButtonPick]}>Capturar Fotografía</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={takePickGallery}>
                            <View style={[Styles.buttonSelectPickViewContainer, GlobalStyles.flexOneView, GlobalStyles.dropShadowButtons, GlobalStyles.flexRow]}>
                                <View style={[Styles.iconPickView, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                                    <Icon adjustsFontSizeToFit name='photo' color={GlobalVariables.SubtitleColorGrey} size={36} />
                                </View>
                                <View style={[Styles.textButtonPickView, GlobalStyles.justifyCenter]}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={[Styles.textButtonPick]}>Seleccionar desde Galería</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </Modal>
    )
}