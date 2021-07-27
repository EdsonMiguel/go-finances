import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import theme from '../../global/styles/theme';

interface CategoryProps{
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background };
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.primary};
  height: ${RFValue(93)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items:center;
  background-color: ${({ isActive }) =>
    isActive ? 
      theme.colors.secundary_light :
      theme.colors.background
  };
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separetor = styled.View`
  width: 100%;
  height:1px;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  padding:24px;
`;