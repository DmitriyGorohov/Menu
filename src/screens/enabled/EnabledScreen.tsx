import React, { type FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { menuSelector } from '../../store/menu/menuSlice.ts'
import Colors from '../../styles/Colors.ts'

const EnabledScreen = (): React.JSX.Element => {
  const { policy } = useSelector(menuSelector)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 1500)
  }, [])

  return (
    <View style={styles.container}>
      {isVisible && (
        <Text style={{ fontSize: 28, fontWeight: '500', color: Colors.white }}>
          {policy}
        </Text>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: Colors.background,
  },
})

export default EnabledScreen
