//LIBRARY
import React, { useState, useEffect, useCallback } from "react";

//COMPONENTS
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
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LogoutButton,
    Loading,
} from "./styles"
import { ActivityIndicator } from 'react-native';
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";
export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightDataProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightDataProps;
    expensives: HighlightDataProps;
    total: HighlightDataProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();
    const { user, signOut } = useAuth();

    const id = user.id;
    const name = user.name;
    const photo = user.photo;

    function getLastDate(collections: DataListProps[], type: string) {
        const lastTransactionFiltered = collections.filter((transaction: DataListProps) => transaction.type === type)
        if (lastTransactionFiltered.length === 0)
            return 0;

        const lastTransaction = new Date(Math
            .max
            .apply(Math, lastTransactionFiltered
                .map(transaction => new Date(transaction.date).getTime())
            ));

        const lastTransactionFormatted = `${String(lastTransaction.getDate()).padStart(2, '0')} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`

        return lastTransactionFormatted;
    }

    async function loadTransactions() {
        const transactionsKey = `@gofinances/transactions_user:${id}`;
        const data = await AsyncStorage.getItem(transactionsKey);
        const transactionsList = data ? JSON.parse(data) : [];
        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactionsList.map((transaction: DataListProps) => {
            if (transaction.type === 'positive') {
                entriesTotal += Number(transaction.amount);
            } else {
                expensiveTotal += Number(transaction.amount);
            }

            const amount = Number(transaction.amount).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            const date = Intl.DateTimeFormat('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(new Date(transaction.date));
            return {
                id: transaction.id,
                name: transaction.name,
                amount,
                type: transaction.type,
                category: transaction.category,
                date
            }
        })
        const lastTransactionEntries = getLastDate(transactionsList, 'positive');
        const lastTransactionExpensives = getLastDate(transactionsList, 'negative');
        const totalInterval = lastTransactionExpensives === 0 ? 'Não há transações' : `01 a ${lastTransactionExpensives}`
        const total = entriesTotal - expensiveTotal;
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-bt', { style: 'currency', currency: 'BRL' }),
                lastTransaction: lastTransactionEntries === 0 ? 'Não há transações' : `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-bt', { style: 'currency', currency: 'BRL' }),
                lastTransaction: lastTransactionExpensives === 0 ? 'Não há transações' : `Última saída dia ${lastTransactionExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-bt', { style: 'currency', currency: 'BRL' }),
                lastTransaction: totalInterval,
            }
        });


        setTransactions(transactionsFormatted);
        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            {
                isLoading
                    ? <Loading>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size='large'
                        />
                    </Loading>
                    : <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo source={{ uri: photo }} />
                                    <User>
                                        <UserGreeting>Olá,</UserGreeting>
                                        <UserName>{name}</UserName>
                                    </User>
                                </UserInfo>
                                <LogoutButton onPress={signOut}>
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>
                        <HighlightCards>
                            <HighlightCard type="up" title="Entradas" amount={highlightData.entries.amount} lastTransaction={highlightData.entries.lastTransaction} />
                            <HighlightCard type="down" title="Saídas" amount={highlightData.expensives.amount} lastTransaction={highlightData.expensives.lastTransaction} />
                            <HighlightCard type="total" title="Total" amount={highlightData.total.amount} lastTransaction={highlightData.total.lastTransaction} />
                        </HighlightCards>


                        <Transactions>
                            <Title>Listagem</Title>

                            <TransactionsList
                                data={transactions}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />

                        </Transactions>
                    </>
            }
        </Container>
    )
}
