import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Types} from "../classes/Pokemon.ts";
import {typeColors} from "../assets/globals.ts";

type Props = {
	type: Types
}

export const TypeCard: React.FC<Props> = ({type}) => {
	return (
		<View style={[styles.view, {backgroundColor: typeColors[type.name]}]}>
			<Image source={{uri: type.image}} style={{width: 30, height: 30}}/>
			<Text style={styles.text}>{type.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 5,
		padding: 6,
		borderRadius: 25,
	},
	text: {
		paddingHorizontal: 10,
	}
})
