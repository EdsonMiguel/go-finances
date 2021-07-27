import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler'
import {Container, Title, Icon} from './styles';


const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface Props extends RectButtonProps{
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