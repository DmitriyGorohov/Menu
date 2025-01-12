import { type FC } from 'react'
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native'
import Colors from '../styles/Colors.ts'
import useLocalize from '../locales/useLocalize.ts'

interface ButtonCustomProps {
  onPress: () => void
  title: string
  disabled?: boolean
  style?: ViewStyle
}

const ButtonCustom: FC<ButtonCustomProps> = ({
  onPress,
  title,
  disabled,
  style,
}): React.JSX.Element => {
  const { t, localize } = useLocalize()
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <Text style={[styles.text, disabled && { opacity: 0.5 }]}>
        {t(localize.Next)}
      </Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: Colors.black,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
})
export default ButtonCustom
