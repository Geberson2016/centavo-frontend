import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Transactions } from "./pages/Transactions";
import { Accounts } from "./pages/Accounts";
import { Categories } from "./pages/Categories";
import { Register } from "./pages/Register";
import { AppLayout } from "./layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/categories" element={<Categories />} />
        </Route>

s        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
