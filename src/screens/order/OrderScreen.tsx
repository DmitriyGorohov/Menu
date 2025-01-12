import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header.tsx'
import Navigation from '../../navigation/navigation.ts'
import useLocalize from '../../locales/useLocalize.ts'
import {
  addProductToBasket,
  decreaseProductQuantity,
  Product,
  shopSelector,
} from '../../store/shop/shopSlice.ts'
import { products } from '../../utils/helpersLists.ts'
import { useDispatch, useSelector } from 'react-redux'
import Counter from '../../components/Counter.tsx'
import Colors from '../../styles/Colors.ts'
import ButtonCustom from '../../components/ButtonCustom.tsx'
import Screens from '../../navigation/const/screens.ts'

const OrderScreen = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const { itemBasket } = useSelector(shopSelector)
  const { t, localize } = useLocalize()

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>
          {t(localize['Length dimension'])}: {item.dimensions.length}
        </Text>
        <Text style={styles.text}>
          {t(localize['Height dimension'])}: {item.dimensions.height}
        </Text>
        <Text style={styles.text}>
          {t(localize['Weight'])}: {item.weight}
        </Text>
        <Text style={styles.text}>
          {t(localize['Capacity'])}: {item.capacity}
        </Text>
        <Text style={styles.text}>
          {t(localize['Material'])}: {item.material}
        </Text>
        <View style={styles.actionsContainer}>
          {itemBasket.some(
            (basketItem) => basketItem.product.id === item.id
          ) ? (
            <Counter
              quantity={
                itemBasket.find(
                  (basketItem) => basketItem.product.id === item.id
                )?.quantity
              }
              onIncrement={() => dispatch(addProductToBasket(item))}
              onDecrement={() => dispatch(decreaseProductQuantity(item.id))}
            />
          ) : (
            <TouchableOpacity
              onPress={() => dispatch(addProductToBasket(item))}
              style={styles.button}
            >
              <Text style={styles.buttonText}>+ {t(localize.Add)}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t(localize['Chair order'])}
        onPress={() => Navigation.pop()}
      />
      <Text
        style={{
          color: Colors.white,
          marginBottom: 20,
          textAlign: 'center',
          fontSize: 22,
        }}
      >
        {t(localize['Select'])}
      </Text>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {itemBasket.length > 0 && (
        <ButtonCustom
          style={{ marginVertical: 20 }}
          onPress={() => Navigation.navigate(Screens.PLACE_ORDER)}
          title={'Next'}
        />
      )}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#E0E4EA', // Цвет карточки
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2E4451',
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    color: '#2E4451',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#000',
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginTop: 8,
    width: '100%',
  },
})
export default OrderScreen
