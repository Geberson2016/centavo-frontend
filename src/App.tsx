import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="flex min-h-screen bg-[#f4f7fe] font-sans antialiased text-slate-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-10">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;