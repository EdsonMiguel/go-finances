import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items:center;
  justify-content: flex-end;
  padding-bottom: 19px;
  
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle:{ padding:24 }
})``;

export const ChartContainer = styled.View`
  width:100%;
  align-items: center;
  justify-content: center;
`;

export const MonthSelect = styled.View`
  width:100%;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  padding: 0 24px;
  margin-top:24px;
`;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const Month = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;


export const LoadContainer = styled.View`
  flex: 1;
  justify-content:center;
  align-items: center;
`;
