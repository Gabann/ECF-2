import {StyleSheet, Text, View} from 'react-native';
import {typeColors} from '../../assets/globals.ts';
import React from 'react';

type Props = {
	type: string;
	resistance: string;
}

export const TypeResistanceCard: React.FC<Props> = ({type, resistance}) => {
	return (
		<View
			style={[{backgroundColor: typeColors[type]}, styles.view]}>
			<Text style={styles.text}>{type}</Text>
			<Text style={styles.text}>x{resistance}</Text>
		</View>
	);
};


const styles = StyleSheet.create({
	text: {
		color: '#000000',
		fontSize: 15,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	view: {
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		padding: 0,
		width: 70,
		height: 50,
	},

});
