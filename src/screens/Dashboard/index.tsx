import React, {useState, useEffect, useCallback} from 'react';
import { 
  Container, 
  LoadContainer,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components/native'

export interface DataListProps extends TransactionCardProps{
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export const Dashboard = () => {

  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightData, setHighlightData] = useState<HighlightData>({
    entries:{
      amount: ""
    },
    expensives:{
      amount: ""
    },
    total:{
      amount: ""
    },
  });

  async function fetchTransactions(){
    const dataKey = "@gofinances:tramsactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted:DataListProps[] = transactions
    .map((item: DataListProps) => {

      if(item.type === 'positive'){
        entriesTotal += Number(item.amount);
      }else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR',{
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        type: item.type,
        category: item.category,
        amount,
        date
      }
    });
    
    setTransactions(transactionsFormatted);
    setIsLoading(false);

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    });
  }

  useEffect(() => { fetchTransactions() }, [])
  useFocusEffect(useCallback(()=>{fetchTransactions()},[]))
  
  const theme = useTheme();

  return (
    <Container>
      {
        isLoading ? 
          <LoadContainer>
            <ActivityIndicator 
              color={theme.colors.primary} 
              size="large"
            /> 
          </LoadContainer>
         :
          <>
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
                amount={highlightData.entries.amount}
                lastTransaction="Última entrada dia 13 de abril"
              />
              <HighLightCard
                type="down"
                title="Saídas"
                amount={highlightData.expensives.amount}
                lastTransaction="Última saída dia 03 de abril"
              />
              <HighLightCard
                type="total"
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction="01 à 16 de abril"
              />
        
            </HighLightCards>
            <Transactions>
              <Title>Listagem</Title>

              <TransactionList 
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({item})=><TransactionCard data={item}/>}
              />
            </Transactions> 
          </>
       }
    </Container>  
  );
}

