
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  FileEdit, 
  Trash2,
  Repeat,
  ChevronRight
} from 'lucide-react';
import { ItemStatus } from '../types';

const MOCK_INVOICES = [
  { id: '1', number: 'INV-B2U-001', client: 'Acme SaaS', date: '2024-03-15', amount: 2500.00, status: ItemStatus.PAID, recurring: true },
  { id: '2', number: 'INV-B2U-002', client: 'Globex Ltd', date: '2024-03-18', amount: 1200.00, status: ItemStatus.SENT, recurring: false },
  { id: '3', number: 'INV-B2U-003', client: 'Soylent Tech', date: '2024-03-20', amount: 4800.00, status: ItemStatus.OVERDUE, recurring: true },
  { id: '4', number: 'INV-B2U-004', client: 'Initech Dev', date: '2024-03-22', amount: 950.00, status: ItemStatus.DRAFT, recurring: false },
];

const StatusBadge = ({ status }: { status: ItemStatus }) => {
  const styles = {
    [ItemStatus.PAID]: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    [ItemStatus.SENT]: 'bg-blue-50 text-blue-700 border-blue-100',
    [ItemStatus.OVERDUE]: 'bg-rose-50 text-rose-700 border-rose-100',
    [ItemStatus.DRAFT]: 'bg-slate-100 text-slate-500 border-slate-200',
    [ItemStatus.CANCELLED]: 'bg-slate-50 text-slate-400 border-slate-100',
  };
  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}>
      {status}
    </span>
  );
};

const InvoiceList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Invoice Archive</h2>
          <p className="text-slate-400 font-medium mt-1">Manage and track your issued billing documents.</p>
        </div>
        <Link 
          to="/invoices/new" 
          className="bg-brand-gradient text-white px-6 py-3 rounded-xl flex items-center space-x-2 text-sm font-bold shadow-xl shadow-teal-500/10 hover:scale-105 transition-all"
        >
          <Plus size={18} />
          <span>New Document</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text"
              placeholder="Filter by ID, client or status..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
              <Filter size={16} />
              <span>Filters</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Document ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Issued</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Value</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Badge</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Utility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_INVOICES.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <span className="font-black text-slate-900">{invoice.number}</span>
                      {invoice.recurring && <Repeat size={14} className="text-teal-500" />}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-600 font-bold">{invoice.client}</td>
                  <td className="px-8 py-6 text-slate-400 font-bold text-sm">{invoice.date}</td>
                  <td className="px-8 py-6 text-slate-900 font-black">${invoice.amount.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"><Eye size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><FileEdit size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg"><ChevronRight size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
