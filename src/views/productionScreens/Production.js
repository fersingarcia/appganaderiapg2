import React, { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, StatusBar } from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
//Import Components
import HeaderTopBar from '../../components/headerTopBar/HeaderTopBar';
import ProductionCard from '../../components/cards/productionCard/ProductionCard';
import DateTimePickerBasic from '../../components/pickers/dateTimePicker/DateTimePicker';
//Import Styles
import Styles from './Styles'
import GlobalStyles from '../../globals/GlobalStyles';

const Production = () => {

    const [animalDataItem, setAnimalDataItem] = useState(''),
        [dateNow, setDateNow] = useState(moment(new Date()).format("DD/MM/YYYY")),
        [showDatePicker, setShowDatePicker] = useState(false),
        [dateFilter, setDateFilter] = useState(''),
        [productionDataItem, setProductionDataItem] = useState(0);

    useFocusEffect(
        useCallback(() => {
            setDateNow(moment(new Date()).format("DD/MM/YYYY"))

            getAnimalData();

            getProductionMilk(new Date(new Date().toDateString()));
        }, [])
    );

    const getAnimalData = () => {
        var animalItems = {
            'Total de vacas': 0, 'Total de toros': 0, 'Total de terneros': 0,
            'Total de becerros': 0, 'Total de novillos': 0, 'Total de animales': 0
        }
        firestore().collection('cows').get().then((querySnapshot) => {
            animalItems['Total de vacas'] = querySnapshot.size;
            animalItems['Total de animales'] += querySnapshot.size;
        });

        firestore().collection('bulls').get().then((querySnapshot) => {
            animalItems['Total de toros'] = querySnapshot.size;
            animalItems['Total de animales'] += querySnapshot.size;
        });

        firestore().collection('calfs').get().then((querySnapshot) => {
            animalItems['Total de terneros'] = querySnapshot.size;
            animalItems['Total de animales'] += querySnapshot.size;
        });

        firestore().collection('steer').get().then((querySnapshot) => {
            animalItems['Total de becerros'] = querySnapshot.size;
            animalItems['Total de animales'] += querySnapshot.size;
        });

        firestore().collection('calves').get().then((querySnapshot) => {
            animalItems['Total de novillos'] = querySnapshot.size;
            animalItems['Total de animales'] += querySnapshot.size;
        });
        setAnimalDataItem(animalItems)

    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dateFilter;
        const dateConvert = moment(currentDate).format("DD/MM/YYYY")
        setShowDatePicker(false);
        setDateFilter(currentDate);
        setDateNow(dateConvert);

        getProductionMilk(new Date(currentDate.toDateString()));
    }

    const getProductionMilk = (filterDate) => {
        const resultProd = [];
        var milkProductionItems = {
            'Total de Ordeños': 0, 'Litros vendidos': 0, 'Consumo ternero (Lt.)': 0,
            'Total de litros': 0
        }

        //Read to Database
        firestore().collection('production').where('date', '==', String(filterDate))
            .get().then((querySnapshot) => {
                milkProductionItems['Total de Ordeños'] = querySnapshot.size;
                querySnapshot.forEach((doc) => {
                    const prod = doc.data();
                    prod.id = doc.id;
                    resultProd.push(prod);
                });
                for (var production in resultProd) {
                    milkProductionItems['Consumo ternero (Lt.)'] += resultProd[production].calfConsum;
                    milkProductionItems['Litros vendidos'] += resultProd[production].liters;
                    milkProductionItems['Total de litros'] += (resultProd[production].calfConsum + resultProd[production].liters)
                }
                setProductionDataItem(milkProductionItems);
            });
    }

    return (
        <View style={GlobalStyles.mainViewContainer}>
            <StatusBar translucent backgroundColor='transparent' />
            <View style={Styles.headerTopViewContainer}>
                <HeaderTopBar />
            </View>
            <View style={[Styles.bodyViewContainer, GlobalStyles.alignCenter]}>
                <View style={[Styles.marginCards, GlobalStyles.flexOneView, GlobalStyles.widthStandardContainer]}>
                    <ProductionCard titleCard='Datos Generales' animalDataItem={animalDataItem} />
                </View>
                <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandardContainer]}>
                    <View style={{ flex: .2, width: '100%', alignItems: 'flex-end', marginBottom: 10 }}>
                        <View style={{ height: '100%', width: '50%' }}>
                            <DateTimePickerBasic label={dateNow} setShowDatePicker={setShowDatePicker} showDatePicker={showDatePicker}
                                setDate={setDateFilter} date={dateFilter} onHandleChange={onChangeDate} />
                        </View>
                    </View>
                    <ProductionCard titleCard='Producción de leche' animalDataItem={productionDataItem} />
                </View>
            </View>
        </View>
    )
}

export default Production;