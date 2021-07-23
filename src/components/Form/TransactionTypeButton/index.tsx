import React from 'react';
import { TouchableOpacityProps } from 'react-native'
import {Container, Title, Icon} from './styles';


const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface Props extends TouchableOpacityProps{
  type: 'up' | 'down';
  isActive: boolean;
  title: string;
}

export function TransactionTypeButton({
  type,
  isActive,
  title,
  ...rest
}:Props){
  return(
    <Container
      type={type}
      isActive={isActive} 
      {...rest}
    >
      <Icon 
        name={icons[type]}
        type={type}
      />
      <Title>{title}</Title>
    </Container>
  )
}