// utils/asyncStorageHelpers.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Product, ShopState } from '../store/shop/shopSlice.ts'

const ORDER_HISTORY_KEY = 'ORDER_HISTORY'

// Функция сохранения истории
export const saveOrderHistoryToStorage = async (
  orderHistory: ShopState['orderHistory']
) => {
  try {
    const jsonValue = JSON.stringify(orderHistory)
    await AsyncStorage.setItem(ORDER_HISTORY_KEY, jsonValue)
  } catch (e) {
    console.error('Error saving order history to AsyncStorage', e)
  }
}

// Функция получения истории
export const getOrderHistoryFromStorage = async (): Promise<
  ShopState['orderHistory']
> => {
  try {
    const jsonValue = await AsyncStorage.getItem(ORDER_HISTORY_KEY)
    return jsonValue != null ? JSON.parse(jsonValue) : []
  } catch (e) {
    console.error('Error retrieving order history from AsyncStorage', e)
    return []
  }
}
