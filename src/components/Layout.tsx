import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, DollarSign, Settings } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'CRM', path: '/crm' },
        { icon: DollarSign, label: 'Finance', path: '/finance' },
    ];

    return (
        <aside className="glass-panel" style={{
            width: 'var(--sidebar-width)',
            height: 'calc(100vh - 2rem)',
            margin: '1rem',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem'
        }}>
            <div className="logo" style={{ marginBottom: '3rem', paddingLeft: '0.5rem' }}>
                <h2 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Fluinty</h2>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            textDecoration: 'none',
                            color: isActive ? 'white' : 'var(--color-text-muted)',
                            background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            transition: 'all 0.2s',
                            fontWeight: isActive ? 500 : 400
                        })}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <button className="btn-ghost" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Settings size={20} />
                    Settings
                </button>
            </div>
        </aside>
    );
};

const Header = () => {
    const location = useLocation();
    const getTitle = () => {
        switch (location.pathname) {
            case '/': return 'Dashboard';
            case '/crm': return 'Client Management';
            case '/finance': return 'Financial Tracker';
            default: return 'Fluinty';
        }
    };

    return (
        <header style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            marginBottom: '1rem'
        }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{getTitle()}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                }}>
                    FL
                </div>
            </div>
        </header>
    );
};

const Layout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <div style={{ flex: 1, padding: '0 2rem 2rem 2rem', overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
