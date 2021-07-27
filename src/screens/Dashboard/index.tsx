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
  HighLightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles';

import {HighLightCard} from '../../components/HighLightCard';
import { TransactionCard, TransactionCardProps  } from '../../components/TransactionCard';


export interface DataListProps extends TransactionCardProps{
  id: string;
}

export const Dashboard = () => {

  const data: DataListProps[]  = [
    {
      id:'1',
      type:'positive',
      title:'Desenvolvimento de site',
      amount:"R$ 12.000,00",
      category:{
        icon:'dollar-sign', 
        name:'Vendas',
      },
      date:'13/04/2020',
    },
    {
      id:'2',
      type:'negative',
      title:'Hamburgueria Pizzy',
      amount:"R$ 59,00",
      category:{
        icon:'coffee', 
        name:'Alimentação',
      },
      date:'13/04/2020',
    },
    {
      id:'3',
      type:'negative',
      title:'Aluguel do apartamento',
      amount:"R$ 1.000,00",
      category:{
        icon:'home', 
        name:'Casa',
      },
      date:'13/04/2020',
    },
  ];


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
          <LogoutButton onPress={() => {}}>
            <Icon name="power"/>
          </LogoutButton> 
        </UserWrapper>
      </Header>
      <HighLightCards>
        <HighLightCard
          type="up"
          title="Entrada"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighLightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighLightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
  
      </HighLightCards>
      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item})=><TransactionCard data={item}/>}
        />

        
      </Transactions> 
    </Container>  
  );
}

