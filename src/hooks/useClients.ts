import { useState, useEffect } from 'react';
import type { Client } from '../types';
import { supabase } from '../lib/supabase';

export const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Map database fields to our type if needed (snake_case to camelCase)
            // Assuming DB columns match our type for simplicity, except last_contact which might need mapping if it was snake_case in DB
            const mappedClients = (data || []).map(item => ({
                id: item.id,
                name: item.name,
                email: item.email,
                company: item.company,
                status: item.status,
                value: item.value,
                lastContact: item.last_contact // Mapping from DB column last_contact
            }));

            setClients(mappedClients);
        } catch (err: any) {
            console.error('Error fetching clients:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addClient = async (client: Omit<Client, 'id'>) => {
        try {
            const { data, error } = await supabase
                .from('clients')
                .insert([{
                    name: client.name,
                    email: client.email,
                    company: client.company,
                    status: client.status,
                    value: client.value,
                    last_contact: client.lastContact
                }])
                .select()
                .single();

            if (error) throw error;

            const newClient = {
                id: data.id,
                name: data.name,
                email: data.email,
                company: data.company,
                status: data.status,
                value: data.value,
                lastContact: data.last_contact
            };

            setClients(prev => [newClient, ...prev]);
        } catch (err: any) {
            console.error('Error adding client:', err);
            setError(err.message);
        }
    };

    const updateClient = async (id: string, updates: Partial<Client>) => {
        try {
            // Prepare updates object, mapping camelCase to snake_case
            const dbUpdates: any = { ...updates };
            if (updates.lastContact) {
                dbUpdates.last_contact = updates.lastContact;
                delete dbUpdates.lastContact;
            }

            const { error } = await supabase
                .from('clients')
                .update(dbUpdates)
                .eq('id', id);

            if (error) throw error;

            setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
        } catch (err: any) {
            console.error('Error updating client:', err);
            setError(err.message);
        }
    };

    const deleteClient = async (id: string) => {
        try {
            const { error } = await supabase
                .from('clients')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setClients(prev => prev.filter(c => c.id !== id));
        } catch (err: any) {
            console.error('Error deleting client:', err);
            setError(err.message);
        }
    };

    return { clients, loading, error, addClient, updateClient, deleteClient };
};
