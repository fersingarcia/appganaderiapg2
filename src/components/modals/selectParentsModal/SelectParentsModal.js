import React, { useState } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
//Import Components
import ButtonComponent from '../../buttons/basicButton/ButtonComponent';
import SearchInput from '../../inputs/searchInput/SearchInput';
import FlatListParents from '../../flatList/flatListParents/FlatListParents';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';

export default function SelectParentsModal({ isVisible, setIsVisible, searchElement, listItems, handleLoadMore, isLoading,
    setIdParent, setNameParent, onSave }) {

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}
            onRequestClose={() => { setIsVisible(!isVisible); }}>
            <View style={GlobalStyles.backgroundTransparent}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[GlobalStyles.justifyCenter, GlobalStyles.flexOneView]}>
                        <View style={[Styles.modalContainer]}>
                            <Text style={Styles.textTitleModal}>Seleccione madre del ternero</Text>
                            <View style={Styles.bodyModal}>
                                <View style={Styles.searchInputModalView}>
                                    <SearchInput element={searchElement} />
                                </View>
                                <View style={Styles.flatListParentsView}>
                                    <FlatListParents listItems={listItems} isLoading={isLoading} setIdParent={setIdParent}
                                        setNameParent={setNameParent} handleLoadMore={handleLoadMore} />
                                </View>
                            </View>
                            <View style={[Styles.buttonsView, GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                                <View style={GlobalStyles.buttonCancelView}>
                                    <ButtonComponent textButton='Cancelar' backgroundColor='#FFF' textColor='#000' onPress={() => { setIsVisible(!isVisible) }} />
                                </View>
                                <View style={GlobalStyles.buttonNextStepView}>
                                    <ButtonComponent textButton='Añadir' backgroundColor={GlobalVariables.ButtonColorGreen} textColor='#FFF'
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