import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navigation from '../../navigation/navigation.ts'
import Header from '../../components/Header.tsx'
import useLocalize from '../../locales/useLocalize.ts'
import Colors from '../../styles/Colors.ts'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProductToBasket,
  decreaseProductQuantity,
  resetProductToBasket,
  saveOrderHistory,
  setOrderBaskets,
  shopSelector,
} from '../../store/shop/shopSlice.ts'
import Counter from '../../components/Counter.tsx'
import { useState } from 'react'
import ButtonCustom from '../../components/ButtonCustom.tsx'
import Screens from '../../navigation/const/screens.ts'
import {
  getOrderHistoryFromStorage,
  saveOrderHistoryToStorage,
} from '../../utils/asyncStorageHelpers.ts'

const PlaceOrder = (): React.JSX.Element => {
  const { t, localize } = useLocalize()
  const dispatch = useDispatch()
  const { itemBasket } = useSelector(shopSelector)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

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
        {t(localize['Enter data'])}
      </Text>
      <View style={styles.form}>
        <View style={styles.labelContainer}>
          <Text
            style={{
              color: Colors.black,
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            {t(localize.Name)}
          </Text>
        </View>
        <TextInput
          placeholder={t(localize.PlaceHolder)}
          style={styles.input}
          value={name}
          placeholderTextColor={Colors.gray}
          onChangeText={setName}
        />
      </View>
      <View style={styles.form}>
        <View style={styles.labelContainer}>
          <Text
            style={{
              color: Colors.black,
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            {t(localize['Phone Number'])}
          </Text>
        </View>
        <TextInput
          placeholderTextColor={Colors.gray}
          placeholder="+44-99-9999-9999"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <FlatList
        data={itemBasket}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.product.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.product.title}</Text>
              <Text style={styles.text}>
                {t(localize['Length dimension'])}:{' '}
                {item.product.dimensions.length}
              </Text>
              <Text style={styles.text}>
                {t(localize['Height dimension'])}:{' '}
                {item.product.dimensions.height}
              </Text>
              <Text style={styles.text}>
                {t(localize['Weight'])}: {item.product.weight}
              </Text>
              <Text style={styles.text}>
                {t(localize['Capacity'])}: {item.product.capacity}
              </Text>
              <Text style={styles.text}>
                {t(localize['Material'])}: {item.product.material}
              </Text>
              <Counter
                quantity={item.quantity}
                onIncrement={() => dispatch(addProductToBasket(item.product))}
                onDecrement={() =>
                  dispatch(decreaseProductQuantity(item.product.id))
                }
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => `${item.product.id}`}
      />
      <ButtonCustom
        disabled={!name || !phone}
        style={{ marginVertical: 20 }}
        onPress={async () => {
          const updatedHistory = [
            ...itemBasket.map((item) => ({
              ...item,
              name: name,
              phone: phone,
            })),
          ]
          dispatch(setOrderBaskets(updatedHistory))
          dispatch(resetProductToBasket())
          Navigation.navigate(Screens.MAIN_APP)
        }}
        title="Next"
      />
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
  labelContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    zIndex: 200,
    paddingHorizontal: 20,
    borderRadius: 100,
    position: 'absolute',
    top: -10,
    left: 20,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    color: Colors.white,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 30,
    paddingHorizontal: 26,
    paddingVertical: 18,
  },
})
export default PlaceOrder
