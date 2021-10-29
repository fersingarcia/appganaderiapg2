import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
//Import Components
import DataPanelCard from '../../../../components/cards/dataPanelCard/DataPanelCard';
//Import Styles
import GlobalStyles from '../../../../globals/GlobalStyles';

const InformationScreen = ({ route }) => {
    const { item } = route.params;
    const [dataItem, setDataItem] = useState('');

    useEffect(() => {
        const birthday = moment(new Date(item.birthday.toDate())).format("DD/MM/YYYY");
        const age = new Date().getFullYear() - new Date(item.birthday.toDate()).getFullYear();
        var dataItem = {
            ...(item.dadCalf && { 'Padre': item.dadCalf }),
            ...(item.momCalf && { 'Madre': item.momCalf }),
            ...(item.typePregnancy && { 'Tipo de Preñez': item.typePregnancy }),
            'Origen': item.origin, 'Genetica': item.genetics, 'Raza': item.race,
            'Color': item.colour, 'Clima': item.climate, 'Fecha de Nacimiento': birthday,
            'Edad': age + ' años', 'Peso': item.weight + ' Kg', 'Características': item.features,

        }
        setDataItem(dataItem);
    }, []);

    return (
        <View style={[GlobalStyles.alignCenter, GlobalStyles.justifyCenter, GlobalStyles.flexOneView]}>
            <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandardContainer]}>
                <DataPanelCard dataItem={dataItem} />
            </View>
        </View>
    )
}

export default InformationScreen;