import React, { useCallback, useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  Loading
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/auth';

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  name: string;
  total: string;
  totalToGraph: number;
  color: string;
  percent: string;
}

export function Resume() {
  const theme = useTheme();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  function handleDate(action: 'next' | 'previous') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const response = await (AsyncStorage.getItem(`@gofinances/transactions_user:${user.id}`));
    const transactions: TransactionData[] = response ? JSON.parse(response) : [];
    const expensives = transactions.filter((transaction: TransactionData) => {
      return transaction.type === "negative"
      	&& new Date(transaction.date).getMonth() === selectedDate.getMonth()
      	&& new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
    })

    const expensiveTotal = expensives
      .reduce((previous: number, current: TransactionData,) => {
        return previous + Number(current.amount)
      }, 0)

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      })

      if (categorySum !== 0) {
        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          name: category.name,
          total: categorySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          color: category.color,
          totalToGraph: categorySum,
          percent,
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading
        ? <Loading>
          <ActivityIndicator color={theme.colors.primary} />
        </Loading>
        : <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton
              onPress={() => handleDate('previous')}
            >
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

            <MonthSelectButton
              onPress={() => handleDate('next')}
            >
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape
                }
              }}
              labelRadius={50}
              x="percent"
              y="totalToGraph"
            />
          </ChartContainer>


          {totalByCategories.map((category: CategoryData) => (
            <HistoryCard
              key={category.name}
              title={category.name}
              amount={category.total}
              color={category.color}
            />
          ))}
        </Content>
      }
    </Container>
  )
}
