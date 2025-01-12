import { type FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navigation from '../../navigation/navigation.ts'
import useLocalize from '../../locales/useLocalize.ts'
import ButtonCustom from '../../components/ButtonCustom.tsx'
import Colors from '../../styles/Colors.ts'
import Screens from '../../navigation/const/screens.ts'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeProductFromOrderBasket,
  resetProductToBasket,
  saveOrderHistory,
  shopSelector,
} from '../../store/shop/shopSlice.ts'
import {
  getOrderHistoryFromStorage,
  saveOrderHistoryToStorage,
} from '../../utils/asyncStorageHelpers.ts'
import { useRoute } from '@react-navigation/native'
import { SuccessRouteProps } from '../../types/stacks/MainStacksType.ts'

interface OrderSuccessProps {}

const OrderSuccess: FC<OrderSuccessProps> = (): React.JSX.Element => {
  const { params } = useRoute<SuccessRouteProps>()
  const dispatch = useDispatch()
  const { ordersBasket } = useSelector(shopSelector)
  const { t, localize } = useLocalize()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: Colors.white, fontSize: 24, marginTop: 20 }}>
        {t(localize['Success!'])}
      </Text>
      <View>
        <Image
          source={require('../../assets/img/success-image/success-image.png')}
          resizeMode={'cover'}
          style={{ marginBottom: 30 }}
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
        onPress={async () => {
          const currentOrderBasket = ordersBasket.filter(
            (item) => item.product.id === params.itemID
          )

          // const newCurrentOrderBasket = {
          //   ...currentOrderBasket,
          //   date: new Date().toISOString(), // Добавляем дату заказа
          // }
          // const updatedHistory = [
          //   ...ordersBasket.map((item) => ({
          //     ...item,
          //     date: new Date().toISOString(),
          //   })),
          // ]
          // await saveOrderHistoryToStorage(updatedHistory)
          //
          // const history = await getOrderHistoryFromStorage()

          dispatch(saveOrderHistory(currentOrderBasket[0]))

          dispatch(removeProductFromOrderBasket(params.itemID))
          Navigation.navigate(Screens.MAIN_APP)
        }}
        title="Back to menu"
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
})
export default OrderSuccess
