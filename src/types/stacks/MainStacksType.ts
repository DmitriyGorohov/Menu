import { type RouteProp } from '@react-navigation/native'
import Screens from '../../navigation/const/screens.ts'

export type MainStackParamsList = {
  [Screens.ORDER_SUCCESS]: {
    itemID: number
  }
}

export type SuccessRouteProps = RouteProp<
  MainStackParamsList,
  Screens.ORDER_SUCCESS
>
