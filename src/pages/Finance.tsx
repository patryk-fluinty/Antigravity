import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { Plus, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const Finance = () => {
    const { transactions, addTransaction, deleteTransaction } = useTransactions();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const totalIncome = transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpenses;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Financial Overview</h2>
                <button className="btn-primary" onClick={() => setIsFormOpen(true)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Plus size={18} /> Add Transaction
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' }}>
                            <TrendingUp size={24} />
                        </div>
                        <span style={{ color: 'var(--color-text-muted)' }}>Total Income</span>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${totalIncome.toLocaleString()}</p>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' }}>
                            <TrendingDown size={24} />
                        </div>
                        <span style={{ color: 'var(--color-text-muted)' }}>Total Expenses</span>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${totalExpenses.toLocaleString()}</p>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)' }}>
                            <DollarSign size={24} />
                        </div>
                        <span style={{ color: 'var(--color-text-muted)' }}>Net Profit</span>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: netProfit >= 0 ? 'white' : 'var(--color-danger)' }}>
                        ${netProfit.toLocaleString()}
                    </p>
                </div>
            </div>

            <div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Recent Transactions</h3>
                <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </div>

            {isFormOpen && (
                <TransactionForm
                    onSave={addTransaction}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
};

export default Finance;
