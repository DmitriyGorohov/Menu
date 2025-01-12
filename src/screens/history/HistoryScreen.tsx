import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header.tsx'
import Navigation from '../../navigation/navigation.ts'
import useLocalize from '../../locales/useLocalize.ts'
import { useSelector } from 'react-redux'
import { shopSelector } from '../../store/shop/shopSlice.ts'

const HistoryScreen = (): React.JSX.Element => {
  const { t, localize } = useLocalize()
  const { orderHistory } = useSelector(shopSelector)
  console.log(orderHistory)
  const renderOrderItem = ({ item }: { item: (typeof orderHistory)[0] }) => {
    const formattedDate = new Date(item.date).toLocaleDateString()

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {t(localize.Name)}: {item.name}
          </Text>
          <Text style={styles.phone}>
            {t(localize['Phone Number'])}: {item.phone}
          </Text>
        </View>

        <Text style={styles.date}>{formattedDate}</Text>

        <View style={styles.body}>
          <Image source={item.product.image} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.product.title}</Text>
            <Text style={styles.amount}>
              {t(localize.Amount)}: {item.quantity}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t(localize['My history'])}
        onPress={() => Navigation.pop()}
      />
      <FlatList
        data={orderHistory}
        showsVerticalScrollIndicator={false}
        renderItem={renderOrderItem}
        keyExtractor={(item) => `${item.date}`}
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
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
export default HistoryScreen
