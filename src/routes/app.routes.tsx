import React from "react";
import { Platform } from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";

import {useTheme} from "styled-components"
import { MaterialIcons } from "@expo/vector-icons"
import { Resume } from "../screens/Resume";

const { Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme(); // access the theme that was created in global theme

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        }
      }}
    >
      <Screen
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            // this color will be the same as the tabBar settings color
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name='Cadastrar'
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name="attach-money"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name='Resumo'
        component={Resume}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name="pie-chart"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}
