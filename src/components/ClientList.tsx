import type { Client } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

interface ClientListProps {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: string) => void;
    onView: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onDelete, onView }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Lead': return 'var(--color-text-muted)';
            case 'Prospect': return '#60a5fa'; // Blue
            case 'Negotiation': return 'var(--color-warning)';
            case 'Closed': return 'var(--color-success)';
            case 'Lost': return 'var(--color-danger)';
            default: return 'var(--color-text-muted)';
        }
    };

    return (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Name</th>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Company</th>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Status</th>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Value</th>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Last Contact</th>
                        <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} style={{ borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }} onClick={() => onView(client)}>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ fontWeight: 500 }}>{client.name}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{client.email}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>{client.company}</td>
                            <td style={{ padding: '1rem' }}>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.75rem',
                                    background: `rgba(255, 255, 255, 0.05)`,
                                    border: `1px solid ${getStatusColor(client.status)}`,
                                    color: getStatusColor(client.status)
                                }}>
                                    {client.status}
                                </span>
                            </td>
                            <td style={{ padding: '1rem' }}>${client.value.toLocaleString()}</td>
                            <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{client.lastContact}</td>
                            <td style={{ padding: '1rem' }} onClick={(e) => e.stopPropagation()}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => onEdit(client)}
                                        className="btn-ghost"
                                        style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(client.id)}
                                        className="btn-ghost"
                                        style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
