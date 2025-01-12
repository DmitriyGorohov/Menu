import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import WebView from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors.ts'
import Navigation from '../../navigation/navigation.ts'
import { menuSelector, setIsOnboarding } from '../../store/menu/menuSlice.ts'
import ButtonCustom from '../../components/ButtonCustom.tsx'
import { Checkbox } from '../../components/Checkbox.tsx'
import { useState } from 'react'

export const WebScreen = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const { policy } = useSelector(menuSelector)
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: policy,
        }}
        style={{
          borderRadius: 20,
        }}
        originWhitelist={['*']}
        allowsBackForwardNavigationGestures
        saveFormDataDisabled
        allowFileAccessFromFileURLs
        allowingReadAccessToURL={policy}
        pullToRefreshEnabled
        javaScriptEnabled
        domStorageEnabled
      />
      <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
        <Checkbox
          value={checked}
          checkBackgroundColor={Colors.black}
          onChange={() => setChecked(!checked)}
          labelPosition={'right'}
          colorLabel={Colors.white}
          label="Accept the privacy policy and rules of use of «BeeFan»"
        />
      </View>
      <ButtonCustom
        disabled={!checked}
        style={{ marginVertical: 20 }}
        onPress={() => {
          dispatch(setIsOnboarding(true))
        }}
        title={'Next'}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
})

export default WebScreen
