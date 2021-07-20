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
  Icon,
  HighLightCards
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
      <HighLightCards>
        <HighLightCard/>
        <HighLightCard/>
        <HighLightCard/>
      </HighLightCards>

    </Container>  
  );
}

