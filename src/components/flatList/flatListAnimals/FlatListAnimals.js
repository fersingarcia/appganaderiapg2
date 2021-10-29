import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
//Import Components
import FlatListItem from '../../cards/flatListItem/FlatListItem';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';
import { GlobalVariables } from '../../../globals/GlobalVariable';


export default function FlatListAnimals({ listItems, handleLoadMore, isLoading }) {
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

    return (
        <View style={GlobalStyles.flexOneView}>
            {Object.values(listItems).length > 0 ? (
                <FlatList
                    data={listItems}
                    renderItem={(listItem) => (<FlatListItem itemData={listItem} />)}
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