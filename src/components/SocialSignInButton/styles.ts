import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  height: ${RFValue(56)}px;
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.shape};
  border-radius:5px;
  margin-bottom: 16px;
`;

export const LogoContainer = styled.View`
  border-radius: 5px;
  padding: ${RFValue(16)}px;
  align-items:center;
  justify-content: center;
  border-color: ${({theme}) => theme.colors.background};
  border-width: 1px;
`;

export const Label = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${({theme})=> theme.fonts.medium};
  font-size: ${RFValue(14)}px;

`;
