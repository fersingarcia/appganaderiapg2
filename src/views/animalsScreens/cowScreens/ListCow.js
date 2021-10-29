import React, { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
//Import Components
import HeaderTopBar from '../../../components/headerTopBar/HeaderTopBar';
import SearchInput from '../../../components/inputs/searchInput/SearchInput';
import TitleWithIcon from '../../../components/titleWithIcon/TitleWithIcon';
import FilterButton from '../../../components/buttons/filterButton/FilterButton';
import FlatListAnimals from '../../../components/flatList/flatListAnimals/FlatListAnimals';
import FAB from '../../../components/buttons/fabButton/FAB';
//Import Styles
import GlobalStyles from '../../../globals/GlobalStyles';

const ListCow = ({ navigation: { goBack, navigate } }) => {
    const [search, setSearch] = useState(''),
        [listCows, setListCows] = useState([]),
        [totalCows, setTotalCows] = useState(0),
        [startCows, setStartCows] = useState(null),
        [isLoading, setIsLoading] = useState(false),
        [filterItems] = useState([{ textButton: 'Todas' }, { textButton: 'Lecheras' }, { textButton: 'Engorde' }, { textButton: 'Favoritas' }]),
        [inputElement] = useState({ searchInput: { label: 'Buscar Vaca', handleChange: setSearch } });

    const limitListCows = 5;

    useFocusEffect(
        useCallback(() => {
            firestore().collection('cows').get().then((querySnapshot) => {
                setTotalCows(querySnapshot.size);
            });

            const resultCows = [];

            firestore().collection('cows').orderBy('createdAt', 'desc').limit(limitListCows).get().then((response) => {
                setStartCows(response.docs[response.docs.length - 1])

                response.forEach((doc) => {
                    const cows = doc.data();
                    cows.id = doc.id;
                    resultCows.push(cows);
                });
                setListCows(resultCows);
            })
        }, [])
    );

    const handleLoadMore = () => {
        const resultCows = [];
        listCows.length < totalCows && setIsLoading(true);

        firestore().collection('cows').orderBy("createdAt", "desc").startAfter(startCows.data().createdAt)
            .limit(limitListCows).get().then((response) => {
                if (response.docs.length > 0) {
                    setStartCows(response.docs[response.docs.length - 1]);
                } else {
                    setIsLoading(false);
                }
                response.forEach((doc) => {
                    const cows = doc.data();
                    cows.id = doc.id;
                    resultCows.push(cows);
                });
                setListCows([...listCows, ...resultCows]);
            });
    };

    return (
        <View style={GlobalStyles.mainViewContainer}>
            <View style={GlobalStyles.headerTopViewContainer}>
                <HeaderTopBar />
            </View>
            <View style={GlobalStyles.bodyViewContainer}>
                <View style={[GlobalStyles.titleViewContainer]}>
                    <TitleWithIcon iconBack textTitle={'Control de Ganado'} onPress={() => goBack()} />
                </View>
                <View style={[GlobalStyles.listCowBodyViewContainer, GlobalStyles.alignCenter]}>
                    <View style={[GlobalStyles.searchInputViewContainer, GlobalStyles.alignCenter, GlobalStyles.widthStandardContainer]}>
                        <SearchInput element={inputElement.searchInput} />
                    </View>
                    <View style={[GlobalStyles.filterButtonsViewContainer, GlobalStyles.widthStandardContainer]}>
                        <ScrollView horizontal={true}>
                            <FilterButton filterItems={filterItems} />
                        </ScrollView>
                    </View>
                    <View style={[GlobalStyles.flatListViewContainer, GlobalStyles.widthStandardContainer]}>
                        <FlatListAnimals listItems={listCows} handleLoadMore={handleLoadMore} isLoading={isLoading} />
                    </View>
                </View>
                <FAB onPress={() => navigate('CreateCowRoot')} />
            </View>
        </View>
    )
}

export default ListCow;