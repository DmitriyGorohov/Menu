import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../styles/Colors.ts';
import Navigation from '../../navigation/navigation.ts';
import { menuSelector } from '../../store/menu/menuSlice.ts';
import ButtonCustom from '../../components/ButtonCustom.tsx';

export const WebScreen = (): React.JSX.Element => {
    const { policy } = useSelector(menuSelector);

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
            <ButtonCustom
                style={{ marginVertical: 20 }}
                onPress={() => {
                    Navigation.pop();
                }}
                title={'Next'}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Colors.background,
    },
});

export default WebScreen;
