import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Colors from '../styles/Colors.ts';

interface CounterProps {
    quantity: number;
    width?: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ quantity, onIncrement, width, onDecrement }) => {
    return (
        <View style={[styles.counterContainer, width && { width }]}>
            <TouchableOpacity onPress={onDecrement} style={[styles.counterButton, { alignItems: 'flex-start' }]}>
                <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{quantity}</Text>
            <TouchableOpacity onPress={onIncrement} style={[styles.counterButton, { alignItems: 'flex-end' }]}>
                <Text style={styles.counterTextRight}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 4,
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 30,
    },
    counterButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.5,
        width: '100%',
        height: 20,
    },
    counterText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.white,
    },
    counterTextRight: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.white,
    },
    addButton: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        elevation: 3,
    },
    addButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: Colors.white,
    },
});

export default Counter;
