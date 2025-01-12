import {
    createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import EnabledScreen from '../../screens/enabled/EnabledScreen.tsx';
import Screens from '../const/screens.ts';

const Stack = createStackNavigator();

const EnabledStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={Screens.MAIN_ENABLED_SCREEN}
        >
            <Stack.Screen
                name={Screens.MAIN_ENABLED_SCREEN}
                component={EnabledScreen}
            />
        </Stack.Navigator>
    );
};

export default EnabledStack;
