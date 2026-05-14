import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";

export function AppLayout() {
  return (
    <div className="flex font-sans text-slate-900">
      <Sidebar />
      <main className="flex-1 min-h-screen ml-64 p-10 bg-slate-200">

        <Outlet />
      </main>
    </div>
  );
}