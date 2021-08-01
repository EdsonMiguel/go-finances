import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Header,
  Title,
  Content
} from './styles';
import { HistotyCard } from '../../components/HistoryCard';
import { categories } from '../../utils/category';


interface HistoryCardProps{
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string; 
}

interface CategoryData{
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const dataKey = "@gofinances:tramsactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((transaction: HistoryCardProps) => transaction.type === 'negative');

    const totalByCategory: CategoryData[]  = [];

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach((expensive: HistoryCardProps) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount)
        }
      })

      if(categorySum > 0){
        const total = categorySum
        .toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        })
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total
        })
      }
      
    });
    setTotalByCategories(totalByCategory)
  }

  useEffect(() => { loadData() }, []);


  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content >
        {
          totalByCategories.map(item => (
            <HistotyCard
              key={item.key}
              title={item.name}
              color={item.color}
              amount={item.total}
            />
          ))
        }
      </Content>
     
    

    </Container>
  )
}