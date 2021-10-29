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

const ListBull = ({ navigation: { goBack, navigate } }) => {
    const [search, setSearch] = useState(''),
        [listBulls, setListBulls] = useState([]),
        [totalBulls, setTotalBulls] = useState(0),
        [startBulls, setStartBulls] = useState(null),
        [isLoading, setIsLoading] = useState(false),
        [filterItems] = useState([{ textButton: 'Todos' }, { textButton: 'Favoritos' }]),
        [inputElement] = useState({ searchInput: { label: 'Buscar Toro', handleChange: setSearch } });

    const limitListBulls = 5;

    useFocusEffect(
        useCallback(() => {
            firestore().collection('bulls').get().then((querySnapshot) => {
                setTotalBulls(querySnapshot.size);
            });

            const resultBulls = [];

            firestore().collection('bulls').orderBy('createdAt', 'desc').limit(limitListBulls).get().then((response) => {
                setStartBulls(response.docs[response.docs.length - 1])

                response.forEach((doc) => {
                    const bulls = doc.data();
                    bulls.id = doc.id;
                    resultBulls.push(bulls);
                });
                setListBulls(resultBulls);
            })
        }, [])
    );

    const handleLoadMore = () => {
        const resultBulls = [];
        listBulls.length < totalBulls && setIsLoading(true);

        firestore().collection('bulls').orderBy("createdAt", "desc").startAfter(startBulls.data().createdAt)
            .limit(limitListBulls).get().then((response) => {
                if (response.docs.length > 0) {
                    setStartBulls(response.docs[response.docs.length - 1]);
                } else {
                    setIsLoading(false);
                }
                response.forEach((doc) => {
                    const bulls = doc.data();
                    bulls.id = doc.id;
                    resultBulls.push(bulls);
                });
                setListBulls([...listBulls, ...resultBulls]);
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
                        <FlatListAnimals listItems={listBulls} handleLoadMore={handleLoadMore} isLoading={isLoading} />
                    </View>
                </View>
                <FAB onPress={() => navigate('CreateBullRoot')} />
            </View>
        </View>
    )
}

export default ListBull;