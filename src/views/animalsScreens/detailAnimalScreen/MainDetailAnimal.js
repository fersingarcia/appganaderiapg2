import React from 'react';
import { View } from 'react-native';
//Import Components
import HeaderTopBar from '../../../components/headerTopBar/HeaderTopBar';
import TitleWithIcon from '../../../components/titleWithIcon/TitleWithIcon';
import DetailCard from '../../../components/cards/detailCard/DetailCard';
//Import Top Tab
import DetailTopTab from '../../../navigation/AnimalNavigation/DetailTopTab';
//Import Styles
import Styles from './Styles';
import GlobalStyles from '../../../globals/GlobalStyles';


const MainDetailAnimal = ({ route, navigation: { goBack } }) => {

    const { item } = route.params;

    return (
        <View style={GlobalStyles.mainViewContainer}>
            <View style={Styles.headerTopViewContainer}>
                <HeaderTopBar />
            </View>
            <View style={[Styles.bodyViewContainer]}>
                <View style={[Styles.titleViewContainer]}>
                    <TitleWithIcon iconBack onPress={() => goBack()} />
                </View>
                <View style={[Styles.detailInfoViewContainer, GlobalStyles.alignCenter]}>
                    <View style={[GlobalStyles.flexOneView, GlobalStyles.widthStandardContainer]}>
                        <DetailCard iconOptions imageProfile={item.image} title={item.name}
                            subTitle={'Codigo: ' + item.code} subTitle2={item.purpose} />
                    </View>
                </View>
                <View style={[Styles.listCowBodyViewContainer]}>
                    <DetailTopTab item={item} />
                </View>
            </View>
        </View>
    )
}

export default MainDetailAnimal;