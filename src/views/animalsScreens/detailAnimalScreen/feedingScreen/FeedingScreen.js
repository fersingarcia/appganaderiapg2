import React, { useState, useCallback, } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View } from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
//Import Components
import DateTimePickerBasic from '../../../../components/pickers/dateTimePicker/DateTimePicker';
import DataPanelCard from '../../../../components/cards/dataPanelCard/DataPanelCard';
import FAB from '../../../../components/buttons/fabButton/FAB';
//Import Styles
import Styles from '../Styles';
import GlobalStyles from '../../../../globals/GlobalStyles';

const FeedingScreen = ({ route, navigation: { navigate } }) => {
    const { item } = route.params;
    const [dateFilter, setDateFilter] = useState(''),
        [showDatePicker, setShowDatePicker] = useState(false),
        [collapsExpand, setCollapsExpand] = useState([false, false, false]),
        [dateNow, setDateNow] = useState(moment(new Date()).format("DD/MM/YYYY")),
        [collapsItem, setCollapsItem] = useState([]);


    useFocusEffect(
        useCallback(() => {
            setDateNow(moment(new Date()).format("DD/MM/YYYY"))

            readFeedingData(new Date(new Date().toDateString()));
        }, [])
    );

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dateFilter;
        const dateConvert = moment(currentDate).format("DD/MM/YYYY")
        setShowDatePicker(false);
        setDateFilter(currentDate);
        setDateNow(dateConvert);

        readFeedingData(new Date(currentDate.toDateString()));
    }

    const readFeedingData = (filterDate) => {
        const resultFeed = [];
        var collapsItem = [{
            title: 'Concentrado', subTitle: '',
            data: [[{ key: 'Tipo de Concentrado', value: 'Lechero' }, { key: 'Consumo mañana (Lb.)', value: 0 },
            { key: 'Consumo tarde (Lb.)', value: 0 }],
            [{ key: 'Tipo de Concentrado', value: 'Engorde' }, { key: 'Consumo mañana (Lb.)', value: 0 },
            { key: 'Consumo tarde (Lb.)', value: 0 }]]
        },
        {
            title: 'Sal', subTitle: '',
            data: [[{ key: 'Tipo de sal', value: 'Mineral' }, { key: 'Consumo mañana (Lb.)', value: 0 },
            { key: 'Consumo tarde (Lb.)', value: 0 }],
            [{ key: 'Tipo de sal', value: 'Blanca' }, { key: 'Consumo mañana (Lb.)', value: 0 },
            { key: 'Consumo tarde (Lb.)', value: 0 }]
            ]
        },
        {
            title: 'Forraje', subTitle: '',
            data: [[{ key: 'Tipo de forraje', value: 'Estrella' }, { key: 'Consumo mañana (Lb.)', value: 0 },
            { key: 'Consumo tarde (Lb.)', value: 0 }],
            [{ key: 'Tipo de forraje', value: 'Brizantha' }, { key: 'Consumo mañana (Lb.)', value: 0 },
            { key: 'Consumo tarde (Lb.)', value: 0 }],
            [{ key: 'Tipo de forraje', value: 'Guinea Mombasa' }, { key: 'Consumo mañana (Lb.)', value: 0 },
            { key: 'Consumo tarde (Lb.)', value: 0 }],
            [{ key: 'Tipo de forraje', value: 'Jaragua' }, { key: 'Consumo mañana (Lb.)', value: 0 },
            { key: 'Consumo tarde (Lb.)', value: 0 }],
            [{ key: 'Tipo de forraje', value: 'King Grass Morado' }, { key: 'Consumo mañana (Lb.)', value: 0 },
            { key: 'Consumo tarde (Lb.)', value: 0 }]
            ]
        }
        ]

        //Read to Database
        firestore().collection('feeding').where('idAnimal', '==', item.id).where('date', '==', String(filterDate))
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const feed = doc.data();
                    feed.id = doc.id;
                    resultFeed.push(feed);
                });

                for (var feeding in resultFeed) {
                    //Set Data Concentrado
                    if (resultFeed[feeding].typeFeeding === 'Concentrado') {
                        if (resultFeed[feeding].typeFeed === 'Lechero') {
                            collapsItem[0].data[0].map((itemValue, index) => {
                                if (itemValue.key === 'Consumo mañana (Lb.)') {
                                    itemValue.value += resultFeed[feeding].morning
                                } else if (itemValue.key === 'Consumo tarde (Lb.)') {
                                    itemValue.value += resultFeed[feeding].afternoon
                                }
                            })
                        } else {
                            collapsItem[0].data[1].map((itemValue, index) => {
                                if (itemValue.key === 'Consumo mañana (Lb.)') {
                                    itemValue.value += resultFeed[feeding].morning
                                } else if (itemValue.key === 'Consumo tarde (Lb.)') {
                                    itemValue.value += resultFeed[feeding].afternoon
                                }
                            })
                        }
                    }
                    //Set Data Sal
                    if (resultFeed[feeding].typeFeeding === 'Sal') {
                        if (resultFeed[feeding].typeFeed === 'Mineral') {
                            collapsItem[1].data[0].map((itemValue, index) => {
                                if (itemValue.key === 'Consumo mañana (Lb.)') {
                                    itemValue.value += resultFeed[feeding].morning
                                } else if (itemValue.key === 'Consumo tarde (Lb.)') {
                                    itemValue.value += resultFeed[feeding].afternoon
                                }
                            })
                        } else {
                            collapsItem[1].data[1].map((itemValue, index) => {
                                if (itemValue.key === 'Consumo mañana (Lb.)') {
                                    itemValue.value += resultFeed[feeding].morning
                                } else if (itemValue.key === 'Consumo tarde (Lb.)') {
                                    itemValue.value += resultFeed[feeding].afternoon
                                }
                            })
                        }
                    }

                    //Set Data Forraje
                    if (resultFeed[feeding].typeFeeding === 'Forraje') {
                        if (resultFeed[feeding].typeFeed === 'Estrella') {
                            collapsItem[2].data[0].map((itemValue, index) => {
                                if (itemValue.key === 'Consumo mañana (Lb.)') {
                                    itemValue.value += resultFeed[feeding].morning
                                } else if (itemValue.key === 'Consumo tarde (Lb.)') {
                                    itemValue.value += resultFeed[feeding].afternoon
                                }
                            })
                        } else if (resultFeed[feeding].typeFeed === 'Brizantha') {
                            collapsItem[2].data[1].map((itemValue, index) => {
                                if (itemValue.key === 'Consumo mañana (Lb.)') {
                                    itemValue.value += resultFeed[feeding].morning
                                } else if (itemValue.key === 'Consumo tarde (Lb.)') {
                                    itemValue.value += resultFeed[feeding].afternoon
                                }
                            })
                        } else if (resultFeed[feeding].typeFeed === 'Guinea Mombasa') {
                            collapsItem[2].data[2].map((itemValue, index) => {
                                if (itemValue.key === 'Consumo mañana (Lb.)') {
                                    itemValue.value += resultFeed[feeding].morning
                                } else if (itemValue.key === 'Consumo tarde (Lb.)') {
                                    itemValue.value += resultFeed[feeding].afternoon
                                }
                            })
                        } else if (resultFeed[feeding].typeFeed === 'Jaragua') {
                            collapsItem[2].data[3].map((itemValue, index) => {
                                if (itemValue.key === 'Consumo mañana (Lb.)') {
                                    itemValue.value += resultFeed[feeding].morning
                                } else if (itemValue.key === 'Consumo tarde (Lb.)') {
                                    itemValue.value += resultFeed[feeding].afternoon
                                }
                            })
                        } else {
                            collapsItem[2].data[4].map((itemValue, index) => {
                                if (itemValue.key === 'Consumo mañana (Lb.)') {
                                    itemValue.value += resultFeed[feeding].morning
                                } else if (itemValue.key === 'Consumo tarde (Lb.)') {
                                    itemValue.value += resultFeed[feeding].afternoon
                                }
                            })
                        }
                    }
                }
                setCollapsItem(collapsItem);
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
                <DataPanelCard according={collapsItem} expanded={collapsExpand} setExpanded={setCollapsExpand} />
            </View>
            <FAB onPress={() => navigate('CreateFeeding', { idAnimal: item.id })} />
        </View>
    )
}

export default FeedingScreen;