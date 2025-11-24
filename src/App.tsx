import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

import CRM from './pages/CRM';

import Finance from './pages/Finance';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="crm" element={<CRM />} />
                    <Route path="finance" element={<Finance />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
