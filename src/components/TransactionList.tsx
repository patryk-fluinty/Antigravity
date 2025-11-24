import type { Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft, Trash2 } from 'lucide-react';

interface TransactionListProps {
    transactions: Transaction[];
    onDelete: (id: string) => void;
}

const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
    return (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Date</th>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Description</th>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Category</th>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Amount</th>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{t.date}</td>
                            <td style={{ padding: '1rem', fontWeight: 500 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        padding: '0.25rem',
                                        borderRadius: '50%',
                                        background: t.type === 'Income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: t.type === 'Income' ? 'var(--color-success)' : 'var(--color-danger)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {t.type === 'Income' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                                    </div>
                                    {t.description}
                                </div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'var(--color-text-dim)'
                                }}>
                                    {t.category}
                                </span>
                            </td>
                            <td style={{ padding: '1rem', fontWeight: 600, color: t.type === 'Income' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                                {t.type === 'Income' ? '+' : '-'}{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(t.amount)}
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <button
                                    onClick={() => onDelete(t.id)}
                                    className="btn-ghost"
                                    style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
