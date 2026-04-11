import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#f4f7fe] font-sans antialiased text-slate-900">
        <Sidebar />
        <main className="flex-1 ml-64 p-10">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;