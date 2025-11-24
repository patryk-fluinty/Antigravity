import React, { useState } from 'react';
import type { Client } from '../types';
import { useClientLogs } from '../hooks/useClientLogs';
import { X, Send, Trash2, Calendar } from 'lucide-react';

interface ClientDetailsProps {
    client: Client;
    onClose: () => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, onClose }) => {
    const { logs, addLog, deleteLog, loading } = useClientLogs(client.id);
    const [newLog, setNewLog] = useState('');

    const handleAddLog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLog.trim()) return;

        await addLog(newLog);
        setNewLog('');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="glass-panel" style={{ width: '800px', height: '80vh', display: 'flex', flexDirection: 'column', background: '#0f0f11', overflow: 'hidden' }}>

                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{client.name}</h2>
                        <p style={{ color: 'var(--color-text-muted)' }}>{client.company}</p>
                    </div>
                    <button onClick={onClose} className="btn-ghost" style={{ padding: '0.5rem' }}><X size={24} /></button>
                </div>

                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                    {/* Sidebar Info */}
                    <div style={{ width: '250px', padding: '1.5rem', borderRight: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</label>
                            <div style={{ marginTop: '0.5rem', display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', fontSize: '0.875rem' }}>
                                {client.status}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deal Value</label>
                            <div style={{ marginTop: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-success)' }}>
                                {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(client.value)}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', wordBreak: 'break-all' }}>
                                {client.email}
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Last Contact</label>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={14} />
                                {client.lastContact}
                            </div>
                        </div>
                    </div>

                    {/* Logs Section */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Activity Log</h3>

                            {loading ? (
                                <div style={{ color: 'var(--color-text-dim)', textAlign: 'center', padding: '2rem' }}>Loading logs...</div>
                            ) : logs.length === 0 ? (
                                <div style={{ color: 'var(--color-text-dim)', textAlign: 'center', padding: '2rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                                    No logs yet. Add a note to get started.
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {logs.map((log) => (
                                        <div key={log.id} className="glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{formatDate(log.created_at)}</span>
                                                <button onClick={() => deleteLog(log.id)} className="btn-ghost" style={{ padding: '0.25rem', color: 'var(--color-text-dim)' }}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', lineHeight: '1.5' }}>{log.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.02)' }}>
                            <form onSubmit={handleAddLog} style={{ display: 'flex', gap: '1rem' }}>
                                <textarea
                                    value={newLog}
                                    onChange={(e) => setNewLog(e.target.value)}
                                    placeholder="Add a note, meeting summary, or next step..."
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'white',
                                        resize: 'none',
                                        height: '80px',
                                        fontFamily: 'inherit'
                                    }}
                                />
                                <button type="submit" className="btn-primary" style={{ height: '80px', padding: '0 1.5rem' }}>
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClientDetails;
