import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
    icon: string;
    text: string;
    value: string;
}

export const PokemonDetailsSubstats: React.FC<Props> = ({icon, text, value}) => {
    return (
        <View style={{marginVertical: 10}}>
            <View style={{flexDirection: 'row'}}>
                <Icon name={icon} size={20}/>
                <Text>{text}</Text>
            </View>
            <View style={[styles.view]}>
                <Text style={styles.text}>{value}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        padding: 6,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'grey',
        width: 180,
    },
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
    },
});

