import { ClientContext } from '@/context/ClientContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {

	const { setToken } = useContext(ClientContext);

	const handleLogout = async () => {
		await AsyncStorage.removeItem('TODO_TOKEN');
		setToken(null);
	}

	return (
		<View className="flex-1 bg-black">

			<StatusBar backgroundColor='#000000' barStyle="light-content" />

			<ScrollView showsVerticalScrollIndicator={false} className="flex-1">

				<View className='w-full space-y-6 py-3 px-3'>

					<View className="space-y-2">

						<TouchableOpacity activeOpacity={0.9} onPress={handleLogout}>
							<Text className="text-white text-center tracking-wide font-semibold text-xl">
								Logout
							</Text>
						</TouchableOpacity>

					</View>

				</View>

			</ScrollView>
		</View>
	);
}

