import { type FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../styles/Colors.ts'
import { langualeList } from '../../utils/helpersLists.ts'
import { SafeAreaView } from 'react-native-safe-area-context'
import useLocalize from '../../locales/useLocalize.ts'
import { changeLanguageFunc } from '../../utils/common.ts'
import { LangType } from '../../types/langTypes.ts'
import Navigation from '../../navigation/navigation.ts'
import Header from '../../components/Header.tsx'

interface LanguageScreenProps {}

const LanguageScreen: FC<LanguageScreenProps> = (): React.JSX.Element => {
  const { t, localize } = useLocalize()

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t(localize.Select_Language)}
        onPress={() => Navigation.pop()}
      />
      {langualeList.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          onPress={() => {
            if (item.id === 1) {
              changeLanguageFunc(LangType.EN)
            } else if (item.id === 2) {
              changeLanguageFunc(LangType.PL)
            } else {
              changeLanguageFunc(LangType.RU)
            }
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginBottom: 16,
            backgroundColor: Colors.black,
          }}
        >
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={item.icon}
              resizeMode={'cover'}
              style={{ marginRight: 12 }}
            />
            <Text
              numberOfLines={1}
              style={{ color: Colors.white, fontSize: 16 }}
            >
              {t(localize[item.name])}
            </Text>
          </View>
          <Image
            source={require('../../assets/img/arrow-right/arrow-right.png')}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
})
export default LanguageScreen
