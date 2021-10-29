import React, { useCallback, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
//Import Components
import ZealCard from '../../../../components/cards/zealCard/ZealCard';
import FlatListAnimals from '../../../../components/flatList/flatListAnimals/FlatListAnimals';
import FAB from '../../../../components/buttons/fabButton/FAB';
import UpdateZealModal from '../../../../components/modals/updateZealModal/UpdateZealModal';
//Import Styles
import Styles from '../Styles';
import GlobalStyles from '../../../../globals/GlobalStyles';

const ReproductionScreen = ({ route, navigation: { navigate } }) => {
    const { item } = route.params;
    const zealDurationValue = item.zealDuration ? item.zealDuration : 0;
    const zealBirthValue = item.zealBirth ? item.zealBirth : 0;

    const [dataZealItem, setDataZealItem] = useState(''),
        [showUpdateZealModal, setShowUpdateZealModal] = useState(false),
        [zealDuration, setZealDuration] = useState(''),
        [zealBirth, setZealBirth] = useState(''),
        [listChildren, setListChildren] = useState([]),
        [isLoading, setIsLoading] = useState(false);

    const [inputElement] = useState({
        zealDuration: { topLabel: 'Duración del celo (Horas)', label: 'Ingrese duración del celo', handleChange: setZealDuration, typeKeyboard: 'numeric' },
        zealBirth: { topLabel: 'Celo post parto (Días)', label: 'Ingrese celo post parto', handleChange: setZealBirth, typeKeyboard: 'numeric' }
    });

    useFocusEffect(
        useCallback(() => {

            renderZeal(zealDurationValue, zealBirthValue);
            readChildren();

        }, [])
    );

    const renderZeal = (duration, birth) => {
        const zealDataItems = {
            'Duración del celo': `${duration} horas.`,
            'Celo post parto': `${birth} días.`
        }
        setDataZealItem(zealDataItems)
    }

    const readChildren = () => {
        const condition = item.typeAnimal === 'cow' ? 'idMomCalf' : 'idDadCalf';
        const resultChildren = [];

        firestore().collection('calfs').where(condition, '==', item.id).get().then((response) => {
            response.forEach((doc) => {
                const children = doc.data();
                children.id = doc.id;
                children.block = true;
                resultChildren.push(children);
            });
            setListChildren(resultChildren);
        })
    }

    const handleLoadMore = () => {
        setIsLoading(false);
    };

    const updateZealCow = () => {
        firestore().collection('cows').doc(item.id).update({
            zealBirth: Number(zealBirth),
            zealDuration: Number(zealDuration)
        }).then(() => {
            setShowUpdateZealModal(false);
            renderZeal(zealBirth, zealDuration);
        });
    }


    return (
        <View style={[GlobalStyles.alignCenter, GlobalStyles.flexOneView]}>
            {item.typeAnimal === 'cow' ?
                <View style={[Styles.zealCard, GlobalStyles.widthStandardContainer]}>
                    <ZealCard dataItem={dataZealItem} showModal={setShowUpdateZealModal} />
                </View> : <></>
            }
            <View style={[Styles.flatListChildren, GlobalStyles.widthStandardContainer]}>
                <FlatListAnimals listItems={listChildren} handleLoadMore={handleLoadMore} isLoading={isLoading} />
            </View>
            <FAB onPress={() => navigate('CreateCalfRoot')} />
            <UpdateZealModal isVisible={showUpdateZealModal} setIsVisible={setShowUpdateZealModal} element={inputElement}
                onSave={updateZealCow} />
        </View>
    )
}

export default ReproductionScreen;