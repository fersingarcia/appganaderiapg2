import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';


export default function FlatListParents({ listItems, handleLoadMore, isLoading, setIdParent, setNameParent }) {
    const ITEM_HEIGHT = 98;

    const renderFooter = () => {
        if (isLoading) {
            return (
                <View style={GlobalStyles.alignCenter, GlobalStyles.justifyCenter}>
                    <ActivityIndicator color={GlobalVariables.ButtonColorGreen} size='large' />
                </View>
            )
        } else {
            return (
                <View style={GlobalStyles.alignCenter}>
                    <Text style={Styles.textFooter}>No Quedan Datos por Cargar</Text>
                </View>
            )
        }
    }

    const selectItem = (id, name) => {
        setIdParent(id)
        setNameParent(name)
    }


    const ListItem = ({ item }) => {
        var uri = GlobalVariables.urlNoImage

        if (item.image) {
            uri = item.image
        }

        return (
            <TouchableWithoutFeedback onPress={() => selectItem(item.id, item.name)} >
                <View style={[GlobalStyles.flexRow, { height: ITEM_HEIGHT }]}>
                    <View style={[Styles.imageItemView, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                        <FastImage style={Styles.imageItem} source={{ uri: uri }} />
                    </View>
                    <View style={[Styles.textItemView, GlobalStyles.justifyCenter]}>
                        <Text style={Styles.textTitlteItem}>{item.name}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={GlobalStyles.flexOneView}>
            {Object.values(listItems).length > 0 ? (
                <FlatList
                    data={listItems}
                    renderItem={ListItem}
                    keyExtractor={item => item.id}
                    getItemLayout={(data, index) => (
                        { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                    )}
                    onEndReached={() => handleLoadMore()}
                    onEndReachedThreshold={0.05}
                    ListFooterComponent={renderFooter}
                />
            ) : (
                Object.values(listItems).length === 0 ? (
                    <View style={[Styles.loaderItems, GlobalStyles.alignCenter]}>
                        <Text>No se han ingresado registros.</Text>
                    </View>
                ) : (
                    <View style={[Styles.loaderItems, GlobalStyles.alignCenter]}>
                        <ActivityIndicator size="large" />
                        <Text>Cargando información</Text>
                    </View>
                )
            )}
        </View>
    )
}