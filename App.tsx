
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  Users, 
  Briefcase, 
  Settings, 
  PlusCircle, 
  CreditCard,
  Menu,
  X
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import QuoteList from './components/QuoteList';
import QuoteForm from './components/QuoteForm';
import ExpenseList from './components/ExpenseList';
import ClientList from './components/ClientList';
import { Logo } from './components/Logo';

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-brand-gradient text-white shadow-lg shadow-teal-500/20 translate-x-1' 
        : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-semibold">{label}</span>
  </Link>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className={`no-print bg-white border-r border-slate-200 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-24'} fixed md:relative h-full z-50 flex flex-col`}>
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen ? (
            <Logo size="md" />
          ) : (
            <div className="mx-auto bg-brand-gradient p-2 rounded-lg text-white font-bold">B2U</div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-100 rounded-lg md:block hidden text-slate-400">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-2 py-4">
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/'} />
          <SidebarItem to="/invoices" icon={FileText} label="Invoices" active={location.pathname.startsWith('/invoices')} />
          <SidebarItem to="/quotes" icon={Receipt} label="Quotes" active={location.pathname.startsWith('/quotes')} />
          <SidebarItem to="/expenses" icon={CreditCard} label="Expenses" active={location.pathname === '/expenses'} />
          <SidebarItem to="/clients" icon={Users} label="Clients" active={location.pathname === '/clients'} />
          <SidebarItem to="/projects" icon={Briefcase} label="Projects" active={location.pathname === '/projects'} />
        </nav>

        <div className="p-6 border-t border-slate-100">
          <SidebarItem to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="no-print bg-white border-b border-slate-200 h-20 flex items-center justify-between px-10 shrink-0">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            {location.pathname === '/' ? 'Financial Overview' : location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1)}
          </h1>
          <div className="flex items-center space-x-6">
            <button className="bg-brand-gradient hover:opacity-90 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 text-sm font-bold transition-all shadow-md shadow-teal-500/10">
              <PlusCircle size={18} />
              <span>New Document</span>
            </button>
            <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
              JD
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/invoices/new" element={<InvoiceForm />} />
          <Route path="/quotes" element={<QuoteList />} />
          <Route path="/quotes/new" element={<QuoteForm />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/projects" element={<div className="text-center py-20 text-slate-500">Projects Module Loading...</div>} />
          <Route path="/settings" element={<div className="text-center py-20 text-slate-500">Settings Module Loading...</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
