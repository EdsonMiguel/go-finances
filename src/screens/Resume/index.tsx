import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectIcon,
  MonthSelectButton,
  Month,
  LoadContainer
} from './styles';
import { HistotyCard } from '../../components/HistoryCard';
import { categories } from '../../utils/category';
import { VictoryPie } from 'victory-native';
import { useFocusEffect } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { addMonths, subMonths, format } from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {ActivityIndicator} from 'react-native';

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
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;

}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  function handleSelectDate(action: 'next' | 'prev'){
    if(action === 'next'){
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate)
    }else{
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate)
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = "@gofinances:tramsactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((transaction: HistoryCardProps) => 
      transaction.type === 'negative' &&
     new Date(transaction.date).getFullYear() === selectedDate.getFullYear() &&
     new Date(transaction.date).getMonth() === selectedDate.getMonth() 
    );

    const expensiveTotal = expensives.reduce(
      (acumulator: number, expensive: HistoryCardProps) => {
        return acumulator += Number(expensive.amount)
      },0)

    const totalByCategory: CategoryData[]  = [];

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach((expensive: HistoryCardProps) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount)
        }
      })

      if(categorySum > 0){
        const totalFormatted = categorySum
        .toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${(categorySum /  expensiveTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
      
    });
    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  const theme = useTheme();
  useFocusEffect(useCallback(() => { loadData() }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <MonthSelect>
        <MonthSelectButton onPress={()=> handleSelectDate('prev')}>
          <MonthSelectIcon name="chevron-left"/>
        </MonthSelectButton>

        <Month>{ format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }</Month>
        <MonthSelectButton onPress={()=> handleSelectDate('next')}>
          <MonthSelectIcon name="chevron-right"/>
        </MonthSelectButton>

      </MonthSelect>
      {
        isLoading ?
        <LoadContainer>
        <ActivityIndicator
          color={theme.colors.primary}
          size="large"
        />
      </LoadContainer> :
      <>
        <ChartContainer>
          <VictoryPie 
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels:{
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={50}
            data={totalByCategories}
            x="percent"
            y="total"
          />
        </ChartContainer>
          <Content >
            {
              totalByCategories.map(item => (
                <HistotyCard
                key={item.key}
                title={item.name}
                color={item.color}
                amount={item.totalFormatted}
                />
                ))
              }
          </Content>
      </>}
    </Container>
  )
}