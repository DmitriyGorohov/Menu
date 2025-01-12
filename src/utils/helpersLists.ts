import Screens from '../navigation/const/screens.ts'
import { Product } from '../store/shop/shopSlice.ts'

export type MenuListType = {
  id: number
  name: string
  icon: ReturnType<typeof require>
  screen?: Screens
}

export const menuList: MenuListType[] = [
  {
    id: 1,
    name: 'My history',
    screen: Screens.HISTORY,
    icon: require('../assets/img/history-icon/calendar.png'),
  },
  {
    id: 2,
    name: 'Select language',
    screen: Screens.LANGUAGE,
    icon: require('../assets/img/language-icon/Vector.png'),
  },
  {
    id: 3,
    name: 'Gallery',
    screen: Screens.GALLERY,
    icon: require('../assets/img/gallery-icon/gallery-icon.png'),
  },
]

export const langualeList: MenuListType[] = [
  {
    id: 1,
    name: 'Set language: English - EN',
    icon: require('../assets/img/language-icon/Vector.png'),
  },
  {
    id: 2,
    name: 'Set language: Poland - PL',
    icon: require('../assets/img/language-icon/Vector.png'),
  },
  {
    id: 3,
    name: 'Set language: Russian - RU',
    icon: require('../assets/img/language-icon/Vector.png'),
  },
]

export const products: Product[] = [
  {
    id: 1,
    title: 'Red lux chair',
    image: require('../assets/img/chair-1/image.png'),
    dimensions: {
      length: '0.7m',
      height: '1.2m',
    },
    weight: '32kg',
    capacity: 1,
    material: 'Eco leather',
    favorites: false,
    price: 150,
  },
  {
    id: 2,
    title: 'Wooden chair',
    image: require('../assets/img/chair-2/image.png'),
    dimensions: {
      length: '0.4m',
      height: '1.1m',
    },
    weight: '7kg',
    capacity: 1,
    material: 'Wood',
    favorites: false,
    price: 120,
  },
  {
    id: 3,
    title: 'Fabric chair',
    image: require('../assets/img/chair-3/image.png'),
    dimensions: {
      length: '0.5m',
      height: '1.3m',
    },
    weight: '22kg',
    capacity: 1,
    material: 'Eco leather',
    favorites: false,
    price: 140,
  },
]
