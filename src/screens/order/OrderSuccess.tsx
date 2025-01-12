import { type FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigation from '../../navigation/navigation.ts';
import useLocalize from '../../locales/useLocalize.ts';
import ButtonCustom from '../../components/ButtonCustom.tsx';
import Colors from '../../styles/Colors.ts';
import Screens from '../../navigation/const/screens.ts';
import {useDispatch} from 'react-redux';
import {resetProductToBasket} from '../../store/shop/shopSlice.ts';

interface OrderSuccessProps {}

const OrderSuccess: FC<OrderSuccessProps> = (): React.JSX.Element => {
    const dispatch = useDispatch()
    const { t, localize } = useLocalize();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ color: Colors.white, fontSize: 24, marginTop: 20 }}>
                {t(localize['Success!'])}
            </Text>
            <View>
                <Image
                    source={require('../../assets/img/success-image/success-image.png')}
                    resizeMode={'cover'}
                    style={{ marginBottom: 30,}}
                />
                <Text
                    style={{
                        color: Colors.white,
                        fontSize: 20,
                        marginBottom: 20,
                        textAlign: 'center',
                    }}
                >
                    {t(localize.Success_title)}
                </Text>
                <Text
                    style={{
                        color: Colors.white,
                        fontSize: 14,
                        textAlign: 'center',
                    }}
                >
                    {t(localize.Success_sub_title)}
                </Text>
            </View>
            <ButtonCustom
                style={{ marginVertical: 20 }}
                onPress={() => {
                    dispatch(resetProductToBasket())
                    Navigation.navigate(Screens.MAIN_APP)
                }}
                title="Back to menu"
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
});
export default OrderSuccess;
