import { useState } from 'react';
import type { Transaction, TransactionType } from '../types';
import { X } from 'lucide-react';

interface TransactionFormProps {
    onSave: (transaction: Omit<Transaction, 'id'>) => void;
    onClose: () => void;
}

const TransactionForm = ({ onSave, onClose }: TransactionFormProps) => {
    const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
        type: 'Income',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="glass-panel" style={{ width: '450px', padding: '2rem', background: '#0f0f11' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem' }}>Add Transaction</h2>
                    <button onClick={onClose} className="btn-ghost" style={{ padding: '0.25rem' }}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        {['Income', 'Expense'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: type as TransactionType })}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    background: formData.type === type
                                        ? (type === 'Income' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                                        : 'rgba(255, 255, 255, 0.05)',
                                    color: formData.type === type
                                        ? (type === 'Income' ? 'var(--color-success)' : 'var(--color-danger)')
                                        : 'var(--color-text-muted)',
                                    border: formData.type === type
                                        ? (type === 'Income' ? '1px solid var(--color-success)' : '1px solid var(--color-danger)')
                                        : '1px solid transparent',
                                    fontWeight: 600
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Description</label>
                        <input
                            type="text" required
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Amount ($)</label>
                            <input
                                type="number" min="0" step="0.01" required
                                value={formData.amount}
                                onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Date</label>
                            <input
                                type="date" required
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Category</label>
                        <input
                            type="text" list="categories" required
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                        />
                        <datalist id="categories">
                            <option value="Service" />
                            <option value="Product" />
                            <option value="Tools" />
                            <option value="Labor" />
                            <option value="Office" />
                            <option value="Marketing" />
                        </datalist>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
                        <button type="submit" className="btn-primary">Save Transaction</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
