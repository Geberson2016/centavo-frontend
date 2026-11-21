import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { server } from '../../test/server';
import { renderWithProviders } from '../../test/render';
import type { DashboardView } from '../../api/types';
import { Dashboard } from '.';

const dashboard: DashboardView = {
  summary: {
    totalBalance: 4579.5,
    creditCardBill: 120.5,
    monthlySavings: 4879.5,
    totalExpense: 120.5,
    totalRevenue: 5000,
    scheduledRevenue: 0,
    scheduledExpense: 300,
  },
  recentTransactions: [
    {
      description: 'Mercado',
      categoryName: 'Alimentação',
      date: '2026-11-10',
      value: 120.5,
      type: 'EXPENSE',
    },
  ],
  accounts: [
    {
      accountId: 10,
      accountName: 'Conta corrente',
      accountType: 'CHECKING',
      totalRevenue: 5000,
      totalExpense: 300,
    },
  ],
};

// O Intl separa "R$" do número com espaço não separável; o regex aceita qualquer espaço.
const brl = (amount: string) => new RegExp(`R\\$\\s${amount.replace('.', '\\.')}`);

describe('Dashboard', () => {
  it('mostra o resumo, as contas e os lançamentos que o BFF agregou', async () => {
    server.use(http.get('/bff/dashboard', () => HttpResponse.json(dashboard)));

    renderWithProviders(<Dashboard />);

    expect(await screen.findByText(brl('4.579,50'))).toBeInTheDocument();
    expect(screen.getByText('Saldo Total')).toBeInTheDocument();
    expect(screen.getByText('Conta corrente')).toBeInTheDocument();
    expect(screen.getByText('Mercado')).toBeInTheDocument();
  });

  // Num app de finanças, mostrar zeros quando a chamada falhou seria pior que avisar.
  it('com falha, avisa em vez de mostrar valores zerados', async () => {
    server.use(
      http.get('/bff/dashboard', () =>
        HttpResponse.json({ status: 502, code: 'UPSTREAM_UNAVAILABLE' }, { status: 502 })
      )
    );

    renderWithProviders(<Dashboard />);

    expect(
      await screen.findByText('Erro ao conectar com o servidor.')
    ).toBeInTheDocument();
    expect(screen.queryByText('Saldo Total')).not.toBeInTheDocument();
  });
});
