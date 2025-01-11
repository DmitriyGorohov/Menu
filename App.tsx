import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Host} from 'react-native-portalize';

const AppWrapper = () => {
    return (
        <GestureHandlerRootView style={styles.container}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    );
};

const App = () => {
    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={'transparent'}
                translucent
            />
            <Host>
                <View>
                    <Text>
                        dsadsad
                    </Text>
                </View>
            </Host>
        </SafeAreaProvider>
)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppWrapper;
