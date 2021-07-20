import React from 'react';
import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon
} from './styles';

import {HighLightCard} from '../../components/HighLightCard'



export const Dashboard = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{uri: 'https://github.com/edsonMiguel.png'}}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Miguel</UserName>
            </User>
          </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
      </Header>
      <HighLightCard/>
    </Container>  
  );
}

