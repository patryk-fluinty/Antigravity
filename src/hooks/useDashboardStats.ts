import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface DashboardStats {
    totalRevenue: number;
    activeClients: number;
    pipelineValue: number;
    recentActivity: any[];
}

export const useDashboardStats = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalRevenue: 0,
        activeClients: 0,
        pipelineValue: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);

            // Fetch Transactions for Revenue
            const { data: transactions } = await supabase
                .from('transactions')
                .select('amount, type')
                .eq('type', 'Income');

            const totalRevenue = (transactions || []).reduce((sum, t) => sum + Number(t.amount), 0);

            // Fetch Clients for Active Count and Pipeline Value
            const { data: clients } = await supabase
                .from('clients')
                .select('status, value');

            const activeClients = (clients || []).filter(c => c.status !== 'Lost' && c.status !== 'Closed').length;
            const pipelineValue = (clients || []).filter(c => c.status !== 'Lost' && c.status !== 'Closed').reduce((sum, c) => sum + Number(c.value), 0);

            // Fetch Recent Activity (Logs)
            const { data: logs } = await supabase
                .from('client_logs')
                .select('*, clients(name)')
                .order('created_at', { ascending: false })
                .limit(5);

            setStats({
                totalRevenue,
                activeClients,
                pipelineValue,
                recentActivity: logs || []
            });

        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return { stats, loading, refetch: fetchStats };
};
