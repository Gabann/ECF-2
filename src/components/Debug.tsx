import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native';

export const Debug = () => {
	async function deleteData(): Promise<void> {
		try {
			await AsyncStorage.removeItem('allPokemons');
			await AsyncStorage.removeItem('capturedPokemons');
			console.log('Data successfully deleted');
		} catch (e) {
			console.log('Failed to delete the data from storage');
		}
	}

	return (
		<Button title={'Delete data'} onPress={deleteData}/>
	);
};
