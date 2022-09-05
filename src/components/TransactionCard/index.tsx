import React from 'react';
import { categories } from '../../utils/categories';
import {
  Container,
  Title,
  Ammount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles';

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: Category;
  date: string;
}

interface Props {
  data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
  const [category] = categories.filter(item => item.key === String(data.category));
  return (
    <Container>
      <Title>
        {data.name}
      </Title>
      <Ammount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Ammount>

      <Footer>
        <Category>
          <Icon name={category.icon}/>
          <CategoryName>
            {category.name}
          </CategoryName>
        </Category>

        <Date>
          {data.date}
        </Date>
      </Footer>
    </Container>
  )
}
