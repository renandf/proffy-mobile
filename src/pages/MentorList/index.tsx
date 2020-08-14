import React, { useState } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import MentorItem, { Mentor } from "../../components/MentorItem";

import api from "../../services/api";

import styles from "./styles";

function MentorList() {
	const [mentors, setMentors] = useState([]);
	const [favorites, setFavorites] = useState<number[]>([]);
	const [isFilterVisible, setIsFilterVisible] = useState(false);

	const [subject, setSubject] = useState("");
	const [week_day, setWeekDay] = useState("");
	const [time, setTime] = useState("");

	function loadFavorites() {
		AsyncStorage.getItem("favorites").then((response) => {
			if (response) {
				const favMentors = JSON.parse(response);
				const favMentorsIds = favMentors.map((mentor: Mentor) => {
					return mentor.id;
				});
				setFavorites(favMentorsIds);
			}
		});
	}

	function toggleFilterVisibility() {
		setIsFilterVisible(!isFilterVisible);
	}

	async function handleFilterSubmit() {
		loadFavorites();

		const response = await api.get("lessons", {
			params: {
				subject,
				week_day,
				time,
			},
		});

		setIsFilterVisible(false);
		setMentors(response.data);
	}

	return (
		<View style={styles.container}>
			<PageHeader
				title="Available mentors"
				headerRight={
					<BorderlessButton onPress={toggleFilterVisibility}>
						<Feather name="filter" size={20} color="#FFF" />
					</BorderlessButton>
				}
			>
				{isFilterVisible && (
					<View style={styles.searchForm}>
						<Text style={styles.label}>Subject</Text>
						<TextInput
							style={styles.input}
							value={subject}
							onChangeText={(text) => setSubject(text)}
							placeholder="Choose a subject"
							placeholderTextColor="#C1BCCC"
						/>

						<View style={styles.inputGroup}>
							<View style={styles.inputBlock}>
								<Text style={styles.label}>Week day</Text>
								<TextInput
									style={styles.input}
									value={week_day}
									onChangeText={(text) => setWeekDay(text)}
									placeholder="Choose a day"
									placeholderTextColor="#C1BCCC"
								/>
							</View>

							<View style={styles.inputBlock}>
								<Text style={styles.label}>Time</Text>
								<TextInput
									style={styles.input}
									value={time}
									onChangeText={(text) => setTime(text)}
									placeholder="Choose a time"
									placeholderTextColor="#C1BCCC"
								/>
							</View>
						</View>

						<RectButton
							onPress={handleFilterSubmit}
							style={styles.submitButton}
						>
							<Text style={styles.submitButtonText}>Filter</Text>
						</RectButton>
					</View>
				)}
			</PageHeader>

			<ScrollView
				style={styles.mentorList}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
			>
				{mentors.map((mentor: Mentor) => {
					return (
						<MentorItem
							key={mentor.id}
							mentor={mentor}
							favorited={favorites.includes(mentor.id)}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
}

export default MentorList;
