import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';


interface IconProps{
  type: 'up' | 'down'
}

interface ContainerProps{
  type: 'up' | 'down';
  isActive: boolean;

}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.text};
  padding: 16px;
  border-radius: 5px;

  ${ ({isActive, type})=> isActive && type === 'up' && css`
      background-color: ${({theme}) => theme.colors.sucess_light};`
  }

  ${ ({isActive, type})=> isActive && type === 'down' && css`
      background-color: ${({theme}) => theme.colors.attention_light};`
  }
  margin-top:8px;
  margin-bottom:16px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${
    ({ theme, type}) => 
      type === 'up' ? 
        theme.colors.sucess :
        theme.colors.attention
  };
`;