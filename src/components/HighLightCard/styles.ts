import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: ${RFValue(300)}px;
  background-color: ${({theme}) =>theme.colors.secundary};
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom:${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${({theme})=>theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) =>theme.colors.title};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(40)}px;
  color: green;
`;

export const Footer = styled.View`
  
`;

export const Amount = styled.Text`
  color: ${({theme})=>theme.colors.text_dark};
  font-family: ${({theme})=>theme.fonts.medium};
  font-size: ${RFValue(32)}px;
`;

export const LastTransaction = styled.Text`
  color: ${({theme})=>theme.colors.text};
  font-family: ${({theme})=>theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;




