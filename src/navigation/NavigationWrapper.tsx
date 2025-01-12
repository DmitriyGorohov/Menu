import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../styles/Colors.ts';
import { MainStack } from './stacks';
import Stacks from './const/stacks.ts';
import Navigation from './navigation.ts';
import EnabledStack from './stacks/EnabledStack.tsx';
import {useSelector} from 'react-redux';
import {menuSelector} from '../store/menu/menuSlice.ts';

const Stack = createStackNavigator();

const NavigationWrapper = (): React.JSX.Element => {
    const { isApi } = useSelector(menuSelector)
    return (
        <NavigationContainer
            ref={Navigation.navigationRef}
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: Colors.background,
                },
            }}
        >
            {!isApi ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name={Stacks.ENABLED}
                        component={EnabledStack}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name={Stacks.MAIN} component={MainStack} />
                </Stack.Navigator>
            )}

        </NavigationContainer>
    );
};

export default NavigationWrapper;
