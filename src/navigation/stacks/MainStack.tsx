import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Screens from '../const/screens.ts'
import MainScreen from '../../screens/main/MainScreen.tsx'
import WebScreen from '../../screens/web/WebScreen.tsx'
import LanguageScreen from '../../screens/language/LanguageScreen.tsx'
import HistoryScreen from '../../screens/history/HistoryScreen.tsx'
import GalleryScreen from '../../screens/gallery/GalleryScreen.tsx'
import OrderScreen from '../../screens/order/OrderScreen.tsx'
import MyOrderScreen from '../../screens/order/MyOrderScreen.tsx'
import PlaceOrder from '../../screens/order/PlaceOrder.tsx'
import OrderSuccess from '../../screens/order/OrderSuccess.tsx'
import { useSelector } from 'react-redux'
import { menuSelector } from '../../store/menu/menuSlice.ts'

const Stack = createStackNavigator()

const MainStack = (): React.JSX.Element => {
  const { isOnboarding } = useSelector(menuSelector)
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isOnboarding ? Screens.MAIN_APP : Screens.WEB_VIEW}
    >
      {!isOnboarding && (
        <Stack.Screen name={Screens.WEB_VIEW} component={WebScreen} />
      )}
      <Stack.Screen name={Screens.MAIN_APP} component={MainScreen} />
      <Stack.Screen name={Screens.LANGUAGE} component={LanguageScreen} />
      <Stack.Screen name={Screens.HISTORY} component={HistoryScreen} />
      <Stack.Screen name={Screens.GALLERY} component={GalleryScreen} />
      <Stack.Screen name={Screens.ORDER} component={OrderScreen} />
      <Stack.Screen name={Screens.MY_ORDER} component={MyOrderScreen} />
      <Stack.Screen name={Screens.PLACE_ORDER} component={PlaceOrder} />
      <Stack.Screen name={Screens.ORDER_SUCCESS} component={OrderSuccess} />
    </Stack.Navigator>
  )
}
export default MainStack
