import React, { useState } from 'react';
import type { Client, ClientStatus } from '../types';
import { X } from 'lucide-react';

interface ClientFormProps {
    onSave: (client: Omit<Client, 'id'>) => void;
    onClose: () => void;
    initialData?: Client;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSave, onClose, initialData }) => {
    const [formData, setFormData] = useState<Omit<Client, 'id'>>({
        name: initialData?.name || '',
        email: initialData?.email || '',
        company: initialData?.company || '',
        status: initialData?.status || 'Lead',
        value: initialData?.value || 0,
        lastContact: initialData?.lastContact || new Date().toISOString().split('T')[0],
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
            <div className="glass-panel" style={{ width: '500px', padding: '2rem', background: '#0f0f11' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem' }}>{initialData ? 'Edit Client' : 'Add New Client'}</h2>
                    <button onClick={onClose} className="btn-ghost" style={{ padding: '0.25rem' }}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Name</label>
                        <input
                            type="text" required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Email</label>
                            <input
                                type="email" required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Company</label>
                            <input
                                type="text" required
                                value={formData.company}
                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as ClientStatus })}
                                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                            >
                                <option value="Lead">Lead</option>
                                <option value="Prospect">Prospect</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="Closed">Closed</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Deal Value (PLN)</label>
                            <input
                                type="number" min="0"
                                value={formData.value}
                                onChange={e => setFormData({ ...formData, value: Number(e.target.value) })}
                                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
                        <button type="submit" className="btn-primary">Save Client</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientForm;
