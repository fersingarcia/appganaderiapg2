import React from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
//Import Components
import ContainInput from '../../inputs/containInput/ContainInput';
import ButtonComponent from '../../buttons/basicButton/ButtonComponent';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default function UpdateZealModal({ isVisible, setIsVisible, element, onSave }) {

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}
            onRequestClose={() => { setIsVisible(!isVisible); }}>
            <View style={GlobalStyles.backgroundTransparent}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[GlobalStyles.justifyCenter, GlobalStyles.flexOneView]}>
                        <View style={[Styles.modalContainer]}>
                            <Text style={Styles.textTitleModal}>Actualizar celo de la vaca</Text>
                            <View style={Styles.bodyModal}>
                                <View style={Styles.inputsView}>
                                    <ContainInput element={element.zealDuration} />
                                </View>

                                <View style={Styles.inputsView}>
                                    <ContainInput element={element.zealBirth} />
                                </View>
                            </View>
                            <View style={[Styles.buttonsView, GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                                <View style={GlobalStyles.buttonCancelView}>
                                    <ButtonComponent textButton='Regresar' backgroundColor='#FFF' textColor='#000' onPress={() => { setIsVisible(!isVisible) }} />
                                </View>
                                <View style={GlobalStyles.buttonNextStepView}>
                                    <ButtonComponent textButton='Guardar' backgroundColor={GlobalVariables.ButtonColorGreen} textColor='#FFF'
                                        dropShadow={GlobalStyles.dropShadowButtons} onPress={onSave} />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    )
}