import React from 'react';
import { DndContext, DragOverlay, useDraggable, useDroppable, type DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Client, ClientStatus } from '../types';

interface PipelineProps {
    clients: Client[];
    onStatusChange: (id: string, status: ClientStatus) => void;
    onView: (client: Client) => void;
}

const COLUMNS: ClientStatus[] = ['Lead', 'Prospect', 'Negotiation', 'Closed', 'Lost'];

const DroppableColumn = ({ status, children, count, totalValue }: { status: string, children: React.ReactNode, count: number, totalValue: number }) => {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    return (
        <div ref={setNodeRef} style={{ minWidth: '280px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{status}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>{count}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, minHeight: '100px' }}>
                {children}
                {count === 0 && (
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
                Total: {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(totalValue)}
            </div>
        </div>
    );
};

const DraggableCard = ({ client, onView }: { client: Client, onView: (client: Client) => void }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: client.id,
        data: { client }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="glass-panel"
        >
            <div
                style={{ padding: '1rem' }}
                onClick={() => onView(client)}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 500 }}>{client.company}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>
                        {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(client.value)}
                    </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{client.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>Last: {client.lastContact}</div>
            </div>
        </div>
    );
};

const Pipeline: React.FC<PipelineProps> = ({ clients, onStatusChange, onView }) => {
    const [activeClient, setActiveClient] = React.useState<Client | null>(null);

    const handleDragStart = (event: any) => {
        setActiveClient(event.active.data.current.client);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveClient(null);

        if (over && active.id !== over.id) {
            const client = active.data.current?.client as Client;
            const newStatus = over.id as ClientStatus;

            if (client && client.status !== newStatus) {
                onStatusChange(client.id, newStatus);
            }
        }
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', height: '100%' }}>
                {COLUMNS.map((status) => {
                    const columnClients = clients.filter(c => c.status === status);
                    const totalValue = columnClients.reduce((sum, c) => sum + c.value, 0);

                    return (
                        <DroppableColumn key={status} status={status} count={columnClients.length} totalValue={totalValue}>
                            {columnClients.map((client) => (
                                <DraggableCard key={client.id} client={client} onView={onView} />
                            ))}
                        </DroppableColumn>
                    );
                })}
            </div>
            <DragOverlay>
                {activeClient ? (
                    <div className="glass-panel" style={{ padding: '1rem', cursor: 'grabbing' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 500 }}>{activeClient.company}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>
                                {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(activeClient.value)}
                            </span>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{activeClient.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>Last: {activeClient.lastContact}</div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Pipeline;
