import { useDashboardStats } from '../hooks/useDashboardStats';
import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
    const { stats, loading } = useDashboardStats();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>

                {/* Revenue Card */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Total Revenue</span>
                        <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-sm)', color: 'var(--color-success)' }}>
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        {loading ? '...' : formatCurrency(stats.totalRevenue)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <TrendingUp size={12} /> +12.5% from last month
                    </div>
                </div>

                {/* Clients Card */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Active Clients</span>
                        <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-sm)', color: '#3b82f6' }}>
                            <Users size={20} />
                        </div>
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        {loading ? '...' : stats.activeClients}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        4 new leads this week
                    </div>
                </div>

                {/* Pipeline Card */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Pipeline Value</span>
                        <div style={{ padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-sm)', color: 'var(--color-warning)' }}>
                            <Activity size={20} />
                        </div>
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                        {loading ? '...' : formatCurrency(stats.pipelineValue)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Potential revenue
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Recent Activity</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {loading ? (
                        <div style={{ color: 'var(--color-text-muted)' }}>Loading activity...</div>
                    ) : stats.recentActivity.length === 0 ? (
                        <div style={{ color: 'var(--color-text-muted)' }}>No recent activity.</div>
                    ) : (
                        stats.recentActivity.map((log: any) => (
                            <div key={log.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 500 }}>{log.clients?.name || 'Unknown Client'}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{log.content}</div>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
                                    {new Date(log.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
