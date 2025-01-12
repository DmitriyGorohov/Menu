import type { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';
import Screens from './const/screens.ts';
// eslint-disable-next-line
export type NavigationParams = Record<string, any>;

export interface IRoute {
    name: string;
    params?: NavigationParams;
}

class NavigationC {
    // eslint-disable-next-line
    navigationRef = React.createRef<NavigationContainerRef<any>>();

    initialRoute = Screens.MAIN_APP;
    // eslint-disable-next-line
    setInitialRoute = (route: any): void => {
        this.initialRoute = route;
    };

    navigate = (routeName: string, params?: NavigationParams): void => {
        // https://github.com/react-navigation/react-navigation/issues/6879
        setTimeout(
            () => this.navigationRef.current?.navigate(routeName, params),
            0,
        );
    };

    canGoBack = (): boolean => this.navigationRef.current?.canGoBack() ?? false;

    replace = (routeName: string, params?: NavigationParams): void => {
        // https://github.com/react-navigation/react-navigation/issues/6879
        setTimeout(
            () => this.navigationRef.current?.reset({
                    index: 0,
                    routes: [{ name: routeName, params }],
                }),
            0,
        );
    };

    resetToScreen = (routes: IRoute[]): void => {
        this.navigationRef.current?.resetRoot({
            index: 0,
            routes,
        });
    };

    pop = (): void => {
        this.navigationRef.current?.goBack();
    };

    pop2 = (): void => {
        this.pop();
        this.pop();
    };
}

const Navigation = new NavigationC();
export default Navigation;
