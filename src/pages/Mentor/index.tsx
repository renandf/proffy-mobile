import React from "react";
import { View, ImageBackground, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import mentorBgImg from "../../assets/images/give-classes-background.png";

function Mentor() {
	const { goBack } = useNavigation();

	function handleNavBack() {
		goBack();
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				resizeMode="contain"
				source={mentorBgImg}
				style={styles.content}
			>
				<Text style={styles.title}>Do you want to become a mentor?</Text>
				<Text style={styles.description}>
					Please register through our website.
				</Text>
			</ImageBackground>

			<RectButton onPress={handleNavBack} style={styles.okButton}>
				<Text style={styles.okButtonText}>OK</Text>
			</RectButton>
		</View>
	);
}

export default Mentor;
