import {EvolutionData} from '../classes/Pokemon.ts';
import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';

type Props = {
    currentPokemonSprite: string;
    previousEvolutions: EvolutionData[];
    nextEvolutions: EvolutionData[];
}

export const EvolutionLine: React.FC<Props> = ({nextEvolutions, currentPokemonSprite, previousEvolutions}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FlatList
                data={previousEvolutions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <>

                    <Text> {'<------'} </Text>
                    <Text>{item.condition}</Text>
                    <Text>{item.name}</Text>

                </>}
            />

            <Image
                source={{uri: currentPokemonSprite}}
                style={{width: 80, height: 80}}/>

            <FlatList
                data={nextEvolutions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <>

                    <Text> {'------>'} </Text>
                    <Text>{item.condition}</Text>
                    <Text>{item.name}</Text>

                </>}
            />
        </View>
    );
};
