import React, { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View } from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
//Import Components
import DataPanelCard from '../../../../components/cards/dataPanelCard/DataPanelCard';
import DateTimePickerBasic from '../../../../components/pickers/dateTimePicker/DateTimePicker';
import FAB from '../../../../components/buttons/fabButton/FAB';
//Import Styles
import Styles from '../Styles'
import GlobalStyles from '../../../../globals/GlobalStyles';

const ProductionScreen = ({ route, navigation: { navigate } }) => {
    const { item } = route.params;
    const [dateFilter, setDateFilter] = useState(''),
        [collapsExpand, setCollapsExpand] = useState([false]),
        [dateNow, setDateNow] = useState(moment(new Date()).format("DD/MM/YYYY")),
        [dataItem, setDataItem] = useState(''),
        [showDatePicker, setShowDatePicker] = useState(false),
        [collapsItem, setCollapsItem] = useState([]);

    useFocusEffect(
        useCallback(() => {
            setDateNow(moment(new Date()).format("DD/MM/YYYY"))

            readProductionData(new Date(new Date().toDateString()));
        }, [])
    );

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dateFilter;
        const dateConvert = moment(currentDate).format("DD/MM/YYYY")
        setShowDatePicker(false);
        setDateFilter(currentDate);
        setDateNow(dateConvert);

        readProductionData(new Date(currentDate.toDateString()));
    }

    const readProductionData = (filterDate) => {
        const resultProd = [];
        var dataItem = { 'Consumo ternero (Lt.)': 0, 'Libras de Concentrado': 0 };
        var collapsItem = [{
            title: 'No. litros de leche', subTitle: 0,
            data: [[{ key: 'Litros en la Mañana', value: 0 }, { key: 'Litros en la tarde', value: 0 }]]
        }]

        //Read to Database
        firestore().collection('production').where('idAnimal', '==', item.id).where('date', '==', String(filterDate))
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const prod = doc.data();
                    prod.id = doc.id;
                    resultProd.push(prod);
                });

                for (var production in resultProd) {
                    if (resultProd[production].schedule === 'Mañana') {
                        collapsItem[0].data[0].map((item, index) => {
                            if (item.key === 'Litros en la Mañana') {
                                item.value += resultProd[production].liters
                            }
                        })
                    } else if (resultProd[production].schedule === 'Tarde') {
                        collapsItem[0].data[0].map((item, index) => {
                            if (item.key === 'Litros en la tarde') {
                                item.value += resultProd[production].liters
                            }
                        })
                    }
                    collapsItem[0].subTitle += resultProd[production].liters;
                    dataItem['Consumo ternero (Lt.)'] += resultProd[production].calfConsum
                    dataItem['Libras de Concentrado'] += resultProd[production].poundsMeal
                }
                setCollapsItem(collapsItem);
                setDataItem(dataItem);
            });
    }

    return (
        <View style={[GlobalStyles.alignCenter, GlobalStyles.flexOneView]}>
            <View style={[Styles.dateFilterViewContainer, GlobalStyles.justifyCenter, GlobalStyles.widthStandardContainer]}>
                <View style={Styles.datePickerView}>
                    <DateTimePickerBasic label={dateNow} setShowDatePicker={setShowDatePicker} showDatePicker={showDatePicker}
                        setDate={setDateFilter} date={dateFilter} onHandleChange={onChangeDate} />
                </View>
            </View>
            <View style={[Styles.dataPanelViewContainer, GlobalStyles.widthStandardContainer]}>
                <DataPanelCard according={collapsItem} dataItem={dataItem} expanded={collapsExpand} setExpanded={setCollapsExpand} />
            </View>
            <FAB onPress={() => navigate('CreateProduction', { idAnimal: item.id })} />
        </View>
    )
}

export default ProductionScreen;