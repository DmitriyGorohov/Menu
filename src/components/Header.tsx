import { type FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../styles/Colors.ts'
import useLocalize from '../locales/useLocalize.ts'

interface HeaderProps {
  title: string
  onPress: () => void
}

const Header: FC<HeaderProps> = ({ title, onPress }): React.JSX.Element => {
  const { t, localize } = useLocalize()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 0,
          top: 5,
        }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: Colors.white,
          }}
        >
          {`< ${t(localize.Back)}`}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 22,
          color: Colors.white,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 32,
  },
})
export default Header
