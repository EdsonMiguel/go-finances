import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled(RectButton)`
  width: 100%;
  background-color: ${({theme}) => theme.colors.secundary};
  border-radius:5px;
  padding:${RFValue(18)}px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.medium};
`;