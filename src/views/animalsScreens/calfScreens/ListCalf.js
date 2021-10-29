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

const ListCalf = ({ navigation: { goBack, navigate } }) => {
    const [search, setSearch] = useState(''),
        [listCalfs, setListCalfs] = useState([]),
        [totalCalfs, setTotalCalfs] = useState(0),
        [startCalfs, setStartCalfs] = useState(null),
        [isLoading, setIsLoading] = useState(false),
        [filterItems] = useState([{ textButton: 'Todos' }, { textButton: 'Favoritos' }]),
        [inputElement] = useState({ searchInput: { label: 'Buscar Ternero', handleChange: setSearch } });

    const limitListCalfs = 5;

    useFocusEffect(
        useCallback(() => {
            firestore().collection('calfs').get().then((querySnapshot) => {
                setTotalCalfs(querySnapshot.size);
            });

            const resultCalfs = [];

            firestore().collection('calfs').orderBy('createdAt', 'desc').limit(limitListCalfs).get().then((response) => {
                setStartCalfs(response.docs[response.docs.length - 1])

                response.forEach((doc) => {
                    const calfs = doc.data();
                    calfs.id = doc.id;
                    resultCalfs.push(calfs);
                });
                setListCalfs(resultCalfs);
            })
        }, [])
    );

    const handleLoadMore = () => {
        const resultCalfs = [];
        listCalfs.length < totalCalfs && setIsLoading(true);

        firestore().collection('calfs').orderBy("createdAt", "desc").startAfter(startCalfs.data().createdAt)
            .limit(limitListCalfs).get().then((response) => {
                if (response.docs.length > 0) {
                    setStartCalfs(response.docs[response.docs.length - 1]);
                } else {
                    setIsLoading(false);
                }
                response.forEach((doc) => {
                    const calfs = doc.data();
                    calfs.id = doc.id;
                    resultCalfs.push(calfs);
                });
                setListCalfs([...listCalfs, ...resultCalfs]);
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
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <FilterButton filterItems={filterItems} />
                        </ScrollView>
                    </View>
                    <View style={[GlobalStyles.flatListViewContainer, GlobalStyles.widthStandardContainer]}>
                        <FlatListAnimals listItems={listCalfs} handleLoadMore={handleLoadMore} isLoading={isLoading} />
                    </View>
                </View>
                <FAB onPress={() => navigate('CreateCalfRoot')} />
            </View>
        </View>
    )
}

export default ListCalf;