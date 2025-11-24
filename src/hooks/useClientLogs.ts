import { useState, useEffect, useCallback } from 'react';
import type { ClientLog } from '../types';
import { supabase } from '../lib/supabase';

export const useClientLogs = (clientId: string | null) => {
    const [logs, setLogs] = useState<ClientLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLogs = useCallback(async () => {
        if (!clientId) {
            setLogs([]);
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('client_logs')
                .select('*')
                .eq('client_id', clientId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            setLogs(data || []);
        } catch (err: any) {
            console.error('Error fetching logs:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [clientId]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const addLog = async (content: string) => {
        if (!clientId) return;

        try {
            const { data, error } = await supabase
                .from('client_logs')
                .insert([{
                    client_id: clientId,
                    content
                }])
                .select()
                .single();

            if (error) throw error;

            setLogs(prev => [data, ...prev]);
        } catch (err: any) {
            console.error('Error adding log:', err);
            setError(err.message);
        }
    };

    const deleteLog = async (id: string) => {
        try {
            const { error } = await supabase
                .from('client_logs')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setLogs(prev => prev.filter(l => l.id !== id));
        } catch (err: any) {
            console.error('Error deleting log:', err);
            setError(err.message);
        }
    };

    return { logs, loading, error, addLog, deleteLog };
};
