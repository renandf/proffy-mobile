import React, { useState } from "react";
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";

import styles from "./styles";

export interface Mentor {
	id: number;
	avatar: string;
	bio: string;
	cost: number;
	name: string;
	subject: string;
	whatsapp: string;
}

interface MentorItemProps {
	mentor: Mentor;
	favorited: boolean;
}

const MentorItem: React.FC<MentorItemProps> = ({ mentor, favorited }) => {
	const [isFavorited, setIsFavorited] = useState(favorited);

	function handleLinkToWhatsapp() {
		api.post("connections", {
			user_id: mentor.id,
		});

		Linking.openURL(`whatsapp://send?phone=${mentor.whatsapp}`);
	}

	async function handleToggleFavorite() {
		const favorites = await AsyncStorage.getItem("favorites");
		let favArray = [];

		if (favorites) {
			favArray = JSON.parse(favorites);
		}

		if (isFavorited) {
			const favIndex = favArray.findIndex((mentorItem: Mentor) => {
				return mentorItem.id === mentor.id;
			});

			favArray.splice(MentorItem, 1);

			setIsFavorited(false);
		} else {
			favArray.push(mentor);

			setIsFavorited(true);
		}

		await AsyncStorage.setItem("favorites", JSON.stringify(favArray));
	}

	return (
		<View style={styles.container}>
			<View style={styles.profile}>
				<Image style={styles.avatar} source={{ uri: mentor.avatar }} />

				<View style={styles.profileInfo}>
					<Text style={styles.name}>{mentor.name}</Text>
					<Text style={styles.subject}>{mentor.subject}</Text>
				</View>
			</View>

			<Text style={styles.bio}>{mentor.bio}</Text>

			<View style={styles.footer}>
				<Text style={styles.price}>
					Cost per hour {"   "}
					<Text style={styles.priceValue}>${mentor.cost}</Text>
				</Text>

				<View style={styles.buttonsContainer}>
					<RectButton
						onPress={handleToggleFavorite}
						style={[styles.favoriteButton, isFavorited && styles.favorited]}
					>
						{isFavorited ? (
							<Image source={unfavoriteIcon} />
						) : (
							<Image source={heartOutlineIcon} />
						)}
					</RectButton>

					<RectButton
						onPress={handleLinkToWhatsapp}
						style={styles.contactButton}
					>
						<Image source={whatsappIcon} />
						<Text style={styles.contactButtonText}>Get in touch</Text>
					</RectButton>
				</View>
			</View>
		</View>
	);
};

export default MentorItem;
