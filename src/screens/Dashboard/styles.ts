import styled from "styled-components/native"; // Brings all the react native elements
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Constants from "expo-constants";

// Create a component that carry styles
// Create a variable with the firt world as upercase to the react native understand that's being created a component
export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background}; // was needed to create the syled.d.ts to use the theme insted of props
`;

export const Header = styled.View`
    width: 100%; 

    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    
    height: ${RFPercentage(42)}px; /* this function work with propotions and return pixel size */
    background: ${({ theme }) => theme.colors.primary};
`;

/* === User Header === */

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    margin-top: ${RFValue(Constants.statusBarHeight)}px; /* Adjust the height status bar when the device is a IPhone X */

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const UserGreeting = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

`;

export const UserName = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};

`;

/* In StyledComponent we can user other components or library that is not installed by defalt, 
   so we have liberty to styles these components or library as follows down.
   After styled was used the parentheses, because is a library   
*/
export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`;  

/* If the list was bigger, use the FlatList */
export const HighlightCards = styled.ScrollView.attrs({
    /* To access the ScrollView properties */
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal : 24 }
})`
    width: 100%;

    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;