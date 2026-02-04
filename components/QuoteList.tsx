
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, ArrowRight } from 'lucide-react';
import { QuoteStatus } from '../types';

const MOCK_QUOTES = [
  { id: '1', number: 'QT-2024-001', client: 'Acme Corp', date: '2024-03-10', amount: 15000.00, status: QuoteStatus.ACCEPTED },
  { id: '2', number: 'QT-2024-002', client: 'Globex Ltd', date: '2024-03-12', amount: 8500.00, status: QuoteStatus.PENDING },
  { id: '3', number: 'QT-2024-003', client: 'Stark Ind', date: '2024-03-14', amount: 22000.00, status: QuoteStatus.DRAFT },
];

const StatusBadge = ({ status }: { status: QuoteStatus }) => {
  const styles = {
    [QuoteStatus.ACCEPTED]: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    [QuoteStatus.PENDING]: 'bg-blue-50 text-blue-700 border-blue-100',
    [QuoteStatus.DRAFT]: 'bg-slate-100 text-slate-600 border-slate-200',
    [QuoteStatus.DECLINED]: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status}
    </span>
  );
};

const QuoteList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quotes</h2>
          <p className="text-slate-500 text-sm">Send professional proposals to your clients.</p>
        </div>
        <Link 
          to="/quotes/new" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-semibold shadow-sm transition-all"
        >
          <Plus size={18} />
          <span>New Quote</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search quotes..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Quote #</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MOCK_QUOTES.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-semibold text-slate-900">{quote.number}</td>
                  <td className="px-6 py-4 text-slate-600">{quote.client}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{quote.date}</td>
                  <td className="px-6 py-4 text-slate-900 font-medium">${quote.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={quote.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {quote.status === QuoteStatus.ACCEPTED && (
                        <button className="flex items-center space-x-1 px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-bold hover:bg-indigo-100 transition-colors">
                          <span>Convert to Invoice</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                      <button className="p-1 text-slate-400 hover:text-indigo-600">View</button>
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

export default QuoteList;
