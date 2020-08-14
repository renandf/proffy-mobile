import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "../pages/Landing";
import Mentor from "../pages/Mentor";
import LearnTabs from "./LearnTabs";

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
	return (
		<NavigationContainer>
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen name="Landing" component={Landing} />
				<Screen name="Mentor" component={Mentor} />
				<Screen name="Learn" component={LearnTabs} />
			</Navigator>
		</NavigationContainer>
	);
}

export default AppStack;
