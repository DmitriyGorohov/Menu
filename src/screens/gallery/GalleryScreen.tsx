import React, { useState } from 'react'
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header.tsx'
import useLocalize from '../../locales/useLocalize.ts'
import Navigation from '../../navigation/navigation.ts'
import Colors from '../../styles/Colors.ts'

const images = [
  { id: 1, uri: require('../../assets/img/g-1/image.png') },
  { id: 2, uri: require('../../assets/img/g-2/image.png') },
  { id: 3, uri: require('../../assets/img/g-3/image.png') },
  { id: 4, uri: require('../../assets/img/g-4/image.png') },
  { id: 5, uri: require('../../assets/img/g-5/image.png') },
  { id: 6, uri: require('../../assets/img/g-6/image.png') },
]
const GalleryScreen = (): React.JSX.Element => {
  const { t, localize } = useLocalize()
  const [isModalVisible, setModalVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else {
      setCurrentImageIndex(0) // Циклический переход
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    } else {
      setCurrentImageIndex(images.length - 1) // Циклический переход
    }
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: { id: number; uri: string }
    index: number
  }) => (
    <TouchableOpacity
      onPress={() => openModal(index)}
      style={styles.imageContainer}
    >
      <Image source={item.uri as ImageSourcePropType} style={styles.image} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t(localize.Gallery)} onPress={() => Navigation.pop()} />
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />

      <Modal
        statusBarTranslucent
        visible={isModalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={closeModal}
            style={styles.closeButton}
          >
            <Text
              style={{ color: Colors.white, fontSize: 30, fontWeight: '700' }}
            >
              X
            </Text>
          </TouchableOpacity>
          <Image
            source={images[currentImageIndex].uri}
            style={styles.modalImage}
            resizeMode="contain"
          />
          <View style={styles.buttonContainer}>
            <Pressable onPress={prevImage} style={styles.button}>
              <Text style={styles.buttonText}>{t(localize.Back)}</Text>
            </Pressable>

            <Pressable onPress={nextImage} style={styles.button}>
              <Text style={styles.buttonText}>{t(localize.Next)}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 20,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 16,
  },
})
export default GalleryScreen
