import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header.tsx'
import Navigation from '../../navigation/navigation.ts'
import useLocalize from '../../locales/useLocalize.ts'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeProductFromBasket,
  removeProductFromOrderBasket,
  shopSelector,
} from '../../store/shop/shopSlice.ts'
import Colors from '../../styles/Colors.ts'
import Screens from '../../navigation/const/screens.ts'

const MyOrderScreen = (): React.JSX.Element => {
  const { t, localize } = useLocalize()
  const dispatch = useDispatch()
  const { ordersBasket } = useSelector(shopSelector)

  const renderOrderItem = ({ item }: { item: (typeof ordersBasket)[0] }) => {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>Name: {item.name}</Text>
          <Text style={styles.phone}>Phone: {item.phone}</Text>
        </View>

        <View style={styles.body}>
          <Image source={item.product.image} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.product.title}</Text>
            <Text style={styles.amount}>
              {t(localize.Amount)}: {item.quantity}
            </Text>
          </View>
        </View>
        <Text
          onPress={() => {
            Navigation.navigate(Screens.ORDER_SUCCESS, {
              itemID: item.product.id,
            })
          }}
          style={[
            styles.date,
            {
              backgroundColor: Colors.redButton,
            },
          ]}
        >
          {t(localize.Canceled)}
        </Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t(localize['My orders'])}
        onPress={() => Navigation.pop()}
      />
      <FlatList
        data={ordersBasket}
        showsVerticalScrollIndicator={false}
        renderItem={renderOrderItem}
        ListEmptyComponent={
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            {t(localize['You do not have any orders created yet'])}
          </Text>
        }
        keyExtractor={(item) => `${item.product.id}`}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  phone: {
    fontSize: 14,
    color: '#000',
  },
  date: {
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10,
    width: '40%',
    textAlign: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
  },
  body: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  info: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  amount: {
    fontSize: 14,
    color: '#000',
  },
  card: {
    backgroundColor: '#d1d5db', // Цвет карточки
    borderRadius: 10,
    padding: 16,
    width: '100%',
    marginBottom: 15,
  },
})
export default MyOrderScreen
