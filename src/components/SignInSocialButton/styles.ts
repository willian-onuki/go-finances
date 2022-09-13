import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled(RectButton)`
  background: ${({ theme }) => theme.colors.shape};

  width: 311px;
  height: ${RFValue(56)}px;

  border-radius: 5px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 16px;
`;

export const ImageButton = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-color: ${({ theme }) => theme.colors.background};
  padding: ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};

  flex: 1;
  text-align: center;
`;
