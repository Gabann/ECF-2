import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

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
		<TouchableOpacity onPress={handlePress} style={[isToggled ? styles.onStyle : styles.offStyle, styles.button]}>
			<Text style={styles.text}>{type}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	onStyle: {
		backgroundColor: 'green',
	},
	offStyle: {
		backgroundColor: 'red',
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
