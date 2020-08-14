import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import PageHeader from "../../components/PageHeader";
import MentorItem, { Mentor } from "../../components/MentorItem";

import styles from "./styles";

function Favorites() {
	const [favorites, setFavorites] = useState([]);

	function loadFavorites() {
		AsyncStorage.getItem("favorites").then((response) => {
			if (response) {
				const favMentors = JSON.parse(response);

				setFavorites(favMentors);
			}
		});
	}

	useFocusEffect(() => {
		loadFavorites();
	});

	return (
		<View style={styles.container}>
			<PageHeader title="Favorite mentors" />

			<ScrollView
				style={styles.mentorList}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
			>
				{favorites.map((mentor: Mentor) => {
					return <MentorItem key={mentor.id} mentor={mentor} favorited />;
				})}
			</ScrollView>
		</View>
	);
}

export default Favorites;
