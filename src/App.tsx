import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';
import { Transactions } from './pages/Transactions';
import { Accounts } from './pages/Accounts';
import { Categories } from './pages/Categories';
import { Register } from './pages/Register';
import { AppLayout } from './layout/AppLayout';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/categories" element={<Categories />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
