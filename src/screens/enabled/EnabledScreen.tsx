import React, { type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/menu/menuSlice.ts';
import Colors from '../../styles/Colors.ts';

interface EnabledScreenProps {}

const EnabledScreen: FC<EnabledScreenProps> = (): React.JSX.Element => {
    const { policy } = useSelector(menuSelector);

    return (
        <View style={styles.container}>
            <Text
                style={{ fontSize: 28, fontWeight: '500', color: Colors.white }}
            >
                ENABLED SCREEN {policy}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        backgroundColor: Colors.background,
    },
});

export default EnabledScreen;
