import { type FC, useEffect } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../styles/Colors.ts';
import { setIsOnboarding } from '../../store/menu/menuSlice.ts';
import { useDispatch } from 'react-redux';
import useLocalize from '../../locales/useLocalize.ts';
import { menuList } from '../../utils/helpersLists.ts';
import Navigation from '../../navigation/navigation.ts';
import Screens from '../../navigation/const/screens.ts';

interface MainScreenProps {}

const MainScreen: FC<MainScreenProps> = (): React.JSX.Element => {
    const { t, localize } = useLocalize();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsOnboarding(true));
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text
                    style={{
                        fontSize: 40,
                        marginTop: 20,
                        color: Colors.white,
                        textAlign: 'center',
                    }}
                >
                    {t(localize.LOGO)}
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        marginTop: 20,
                        marginBottom: 32,
                        color: Colors.white,
                        textAlign: 'center',
                    }}
                >
                    {t(localize.SUB_LOGO)}
                </Text>
                {menuList.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.8}
                        onPress={() =>
                            Navigation.navigate(item.screen as Screens)
                        }
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 16,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            marginBottom: 16,
                            backgroundColor: Colors.black,
                        }}
                    >
                        <View
                            style={{
                                width: '80%',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={item.icon}
                                resizeMode={'cover'}
                                style={{ marginRight: 12 }}
                            />
                            <Text
                                numberOfLines={1}
                                style={{ color: Colors.white, fontSize: 16 }}
                            >
                                {t(localize[item.name as string])}
                            </Text>
                        </View>
                        <Image
                            source={require('../../assets/img/arrow-right/arrow-right.png')}
                            resizeMode={'cover'}
                        />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    onPress={() => Navigation.navigate(Screens.ORDER)}
                    activeOpacity={0.8}
                    style={{
                        width: '100%',
                        borderRadius: 22,
                        overflow: 'hidden',
                        marginBottom: 24,
                    }}
                >
                    <View
                        style={{
                            zIndex: 999,
                            paddingHorizontal: 20,
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'absolute',
                            bottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.white,
                                fontSize: 22,
                                fontWeight: '900',
                            }}
                        >
                            {t(localize['Order'])}
                        </Text>
                        <Image
                            source={require('../../assets/img/arrow-right/arrow-right.png')}
                            resizeMode={'cover'}
                        />
                    </View>
                    <Image
                        style={{ width: '100%' }}
                        resizeMode={'cover'}
                        source={require('../../assets/img/order-image/image.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Navigation.navigate(Screens.MY_ORDER)}
                    activeOpacity={0.8}
                    style={{
                        width: '100%',
                        borderRadius: 22,
                        overflow: 'hidden',
                    }}
                >
                    <View
                        style={{
                            zIndex: 999,
                            width: '100%',
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'absolute',
                            bottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.white,
                                fontSize: 22,
                                fontWeight: '900',
                            }}
                        >
                            {t(localize['My Order'])}
                        </Text>
                        <Image
                            source={require('../../assets/img/arrow-right/arrow-right.png')}
                            resizeMode={'cover'}
                        />
                    </View>
                    <Image
                        style={{ width: '100%' }}
                        resizeMode={'cover'}
                        source={require('../../assets/img/my-order-image/image.png')}
                    />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
    },
});
export default MainScreen;
