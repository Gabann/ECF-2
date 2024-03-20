import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {typeColors} from "../assets/globals.ts";

type Props = {
	type: string;
	toggleTypeFilter: (type: string) => void;
}

export const TypeFilterButton: React.FC<Props> = ({type, toggleTypeFilter}) => {
	const [isToggled, setIsToggled] = useState<boolean>(false);

	function handlePress(): void {
		setIsToggled(!isToggled);
		toggleTypeFilter(type);
	}

	return (
		<TouchableOpacity onPress={handlePress}
		                  style={[isToggled ? styles.onStyle : styles.offStyle, styles.button, {backgroundColor: typeColors[type]}]}>
			<Text style={styles.text}>{type}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	onStyle: {
		opacity: 1,
	},
	offStyle: {
		opacity: 0.5,
	},
	button: {
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		padding: 8,
	}, text: {
		color: '#000000',
		fontSize: 15,
		textAlign: 'center',
		textAlignVertical: 'center',
	}

})
