import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppDispatch, persistor, store } from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Host } from 'react-native-portalize';
import NavigationWrapper from './src/navigation/NavigationWrapper.tsx';
import {
    menuSelector,
    setIsApi,
    setPolicyPath,
} from './src/store/menu/menuSlice.ts';
import { useEffect } from 'react';
import { AxiosApi } from './src/api/axiosApi.ts';
import { I18nextProvider } from 'react-i18next';
import Localization from './src/locales/LangAdapter.ts'

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
    const dispatch = useDispatch<AppDispatch>();
    const { isOnboarding } = useSelector(menuSelector);

    useEffect(() => {
        (async () => {
            if (!isOnboarding) {
                const api = new AxiosApi('https://clicsushi.store');
                try {
                    const data = await api.getTestData();
                    dispatch(setPolicyPath(data.policy));
                    if (data.policy.includes('privacypolicies')) {
                        dispatch(setIsApi(true));
                    } else {
                        dispatch(setIsApi(false));
                    }
                    console.log('Ответ от API:', data);
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            }
        })();
    }, [dispatch, isOnboarding]);

    return (
        <I18nextProvider i18n={Localization}>
            <SafeAreaProvider style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={'transparent'}
                    translucent
                />
                <Host>
                    <NavigationWrapper />
                </Host>
            </SafeAreaProvider>
        </I18nextProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppWrapper;
