import React from 'react';
import type { Client, ClientStatus } from '../types';

interface PipelineProps {
    clients: Client[];
    onStatusChange: (id: string, status: ClientStatus) => void;
}

const COLUMNS: ClientStatus[] = ['Lead', 'Prospect', 'Negotiation', 'Closed', 'Lost'];

const Pipeline: React.FC<PipelineProps> = ({ clients, onStatusChange }) => {
    return (
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
            {COLUMNS.map((status) => {
                const columnClients = clients.filter(c => c.status === status);
                const totalValue = columnClients.reduce((sum, c) => sum + c.value, 0);

                return (
                    <div key={status} style={{ minWidth: '280px', flex: 1 }}>
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{status}</h3>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{columnClients.length}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {columnClients.map((client) => (
                                <div key={client.id} className="glass-panel" style={{ padding: '1rem', cursor: 'grab' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 500 }}>{client.company}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>${client.value.toLocaleString()}</span>
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{client.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', marginBottom: '0.5rem' }}>Last: {client.lastContact}</div>

                                    <select
                                        value={client.status}
                                        onChange={(e) => onStatusChange(client.id, e.target.value as ClientStatus)}
                                        style={{
                                            width: '100%',
                                            padding: '0.25rem',
                                            fontSize: '0.75rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-sm)',
                                            color: 'var(--color-text-muted)',
                                            marginTop: '0.5rem'
                                        }}
                                    >
                                        {COLUMNS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            ))}
                            {columnClients.length === 0 && (
                                <div style={{
                                    padding: '1rem',
                                    border: '1px dashed var(--color-border)',
                                    borderRadius: 'var(--radius-sm)',
                                    textAlign: 'center',
                                    color: 'var(--color-text-dim)',
                                    fontSize: '0.875rem'
                                }}>
                                    No deals
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-dim)', textAlign: 'right' }}>
                            Total: ${totalValue.toLocaleString()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Pipeline;
