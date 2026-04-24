import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Transactions } from "./pages/Transactions";
import { Accounts } from "./pages/Accounts";
import { Categories } from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <div className="flex font-sans text-slate-900">
        <Sidebar />
        <main className="flex-1 min-h-screen ml-64 p-10 bg-slate-200">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/categories" element={<Categories />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
