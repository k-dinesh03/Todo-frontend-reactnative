import React, { createContext, useState, useContext, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import animationData from '../assets/loader/loader.json';

export const GlobalContext = createContext<{
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({ loading: false, setLoading: () => { } });

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
	children: ReactNode;
}

export default function GlobalProvider({ children }: GlobalProviderProps) {

	const [loading, setLoading] = useState(false);

	const values = {
		loading,
		setLoading,
	};

	return (
		<GlobalContext.Provider value={values}>
			{children}
			{loading && (
				<View style={styles.overlay}>
					<LottieView
						source={animationData}
						autoPlay
						loop
						style={{ width: 200, height: 200 }}
					/>
				</View>
			)}
		</GlobalContext.Provider>
	);
}

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 9999,
	},
});
