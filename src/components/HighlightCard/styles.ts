import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons"

interface TypeProps {
    type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
    width: ${RFValue(300)}px;
    border-radius: 5px;

    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;

    background: ${({ theme, type }) => type === 'total' ? theme.colors.secondary : theme.colors.shape};
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather) <TypeProps>`
    /*Was created the IconProps interface,
    and the Icon receive the IconProps type
    to define colors for each icon types */
    font-size: ${RFValue(40)}px;
    ${({type}) => type === 'up' && css`
        color: ${({ theme }) => theme.colors.success};
    `}
    ${({type}) => type === 'down' && css`
        color: ${({ theme }) => theme.colors.attention};
    `}
    ${({type}) => type === 'total' && css`
        color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View`
`;

export const Amount = styled.Text<TypeProps>`
    font-size: ${RFValue(32)}px;
    color: ${({ theme, type }) => type==='total' ? theme.colors.shape : theme.colors.text_dark};
    font-family: ${({ theme }) => theme.fonts.medium};
    margin-top: 35px;
`;

export const LastTransaction = styled.Text<TypeProps>`
    font-size: ${RFValue(12)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text};
`;
