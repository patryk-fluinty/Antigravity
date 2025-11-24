import { useState } from 'react';
import { useClients } from '../hooks/useClients';
import ClientList from '../components/ClientList';
import Pipeline from '../components/Pipeline';
import ClientForm from '../components/ClientForm';
import ClientDetails from '../components/ClientDetails';
import { Plus, LayoutList, Kanban } from 'lucide-react';
import type { Client } from '../types';

const CRM = () => {
    const { clients, addClient, updateClient, deleteClient } = useClients();
    const [view, setView] = useState<'list' | 'pipeline'>('list');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}>
                    <button
                        onClick={() => setView('list')}
                        className={view === 'list' ? 'btn-ghost' : 'btn-ghost'}
                        style={{
                            background: view === 'list' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: view === 'list' ? 'white' : 'var(--color-text-muted)',
                            display: 'flex', gap: '0.5rem', alignItems: 'center'
                        }}
                    >
                        <LayoutList size={18} /> List
                    </button>
                    <button
                        onClick={() => setView('pipeline')}
                        className={view === 'pipeline' ? 'btn-ghost' : 'btn-ghost'}
                        style={{
                            background: view === 'pipeline' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: view === 'pipeline' ? 'white' : 'var(--color-text-muted)',
                            display: 'flex', gap: '0.5rem', alignItems: 'center'
                        }}
                    >
                        <Kanban size={18} /> Pipeline
                    </button>
                </div>

                <button className="btn-primary" onClick={() => setIsFormOpen(true)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Plus size={18} /> Add Client
                </button>
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
                {view === 'list' ? (
                    <ClientList
                        clients={clients}
                        onEdit={() => { }}
                        onDelete={deleteClient}
                        onView={setSelectedClient}
                    />
                ) : (
                    <Pipeline
                        clients={clients}
                        onStatusChange={(id, status) => updateClient(id, { status })}
                        onView={setSelectedClient}
                    />
                )}
            </div>

            {isFormOpen && (
                <ClientForm
                    onSave={addClient}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            {selectedClient && (
                <ClientDetails
                    client={selectedClient}
                    onClose={() => setSelectedClient(null)}
                />
            )}
        </div>
    );
};

export default CRM;
