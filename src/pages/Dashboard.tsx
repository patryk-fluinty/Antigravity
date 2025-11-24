
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                background: `rgba(${color}, 0.1)`,
                color: `rgb(${color})`
            }}>
                <Icon size={24} />
            </div>
            <span style={{
                fontSize: '0.875rem',
                color: change >= 0 ? 'var(--color-success)' : 'var(--color-danger)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
            }}>
                {change >= 0 ? '+' : ''}{change}%
                <TrendingUp size={14} />
            </span>
        </div>
        <div>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{value}</p>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <StatCard
                    title="Total Revenue"
                    value="$12,450"
                    change={12.5}
                    icon={DollarSign}
                    color="99, 102, 241" // Primary Indigo
                />
                <StatCard
                    title="Active Clients"
                    value="24"
                    change={8.2}
                    icon={Users}
                    color="168, 85, 247" // Accent Purple
                />
                <StatCard
                    title="Pipeline Value"
                    value="$45,200"
                    change={-2.4}
                    icon={Activity}
                    color="245, 158, 11" // Warning Orange
                />
            </div>

            {/* Recent Activity & Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '300px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Revenue Overview</h3>
                    <div style={{
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-text-muted)'
                    }}>
                        Chart Placeholder
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                                <div>
                                    <p style={{ fontSize: '0.875rem' }}>New client added</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
