import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../test/render';
import type { RecentTransactionResponse } from '../../api/types';
import { TransactionsTable } from '.';

const transactions: RecentTransactionResponse[] = [
  {
    description: 'Salário',
    categoryName: 'Renda',
    date: '2026-11-05',
    value: 5000,
    type: 'INCOME',
  },
  {
    description: 'Mercado',
    categoryName: 'Alimentação',
    date: '2026-11-10',
    value: 120.5,
    type: 'EXPENSE',
  },
];

describe('TransactionsTable', () => {
  it('formata receita e despesa no idioma ativo', () => {
    renderWithProviders(<TransactionsTable transactions={transactions} />);

    const [, income, expense] = screen.getAllByRole('row');
    expect(within(income).getByText('Salário')).toBeInTheDocument();
    expect(within(income).getByText('+ R$ 5.000,00')).toBeInTheDocument();
    expect(within(expense).getByText('Alimentação')).toBeInTheDocument();
    expect(within(expense).getByText('- R$ 120,50')).toBeInTheDocument();
  });

  it('mostra o estado vazio', () => {
    renderWithProviders(<TransactionsTable transactions={[]} />);

    expect(
      screen.getByText('Nenhuma transação nos últimos 30 dias.')
    ).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('com erro, avisa e não mostra a tabela', () => {
    renderWithProviders(<TransactionsTable transactions={[]} isError />);

    expect(screen.getByText('Erro ao carregar transações.')).toBeInTheDocument();
    expect(
      screen.queryByText('Nenhuma transação nos últimos 30 dias.')
    ).not.toBeInTheDocument();
  });
});
