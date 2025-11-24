import { useState, useEffect } from 'react';
import type { Transaction } from '../types';
import { supabase } from '../lib/supabase';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;

            setTransactions(data || []);
        } catch (err: any) {
            console.error('Error fetching transactions:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .insert([transaction])
                .select()
                .single();

            if (error) throw error;

            setTransactions(prev => [data, ...prev]);
        } catch (err: any) {
            console.error('Error adding transaction:', err);
            setError(err.message);
        }
    };

    const deleteTransaction = async (id: string) => {
        try {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setTransactions(prev => prev.filter(t => t.id !== id));
        } catch (err: any) {
            console.error('Error deleting transaction:', err);
            setError(err.message);
        }
    };

    return { transactions, loading, error, addTransaction, deleteTransaction };
};
