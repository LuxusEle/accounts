
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Tag, 
  Briefcase, 
  DollarSign, 
  Calendar,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';

const MOCK_EXPENSES = [
  { id: '1', description: 'AWS Cloud Services', date: '2024-03-01', amount: 450.00, category: 'Infrastructure', project: 'Internal', paid: true },
  { id: '2', description: 'GitHub Enterprise Subscription', date: '2024-03-05', amount: 120.00, category: 'SaaS', project: 'Development', paid: true },
  { id: '3', description: 'Team Offsite Lunch', date: '2024-03-10', amount: 285.50, category: 'Meals', project: null, paid: false },
  { id: '4', description: 'Digital Ocean Droplets', date: '2024-03-12', amount: 85.00, category: 'Infrastructure', project: 'Client - Globex', paid: true },
  { id: '5', description: 'Figma Pro License', date: '2024-03-15', amount: 45.00, category: 'Software', project: 'Design', paid: false },
];

const ExpenseList: React.FC = () => {
  const [filterProject, setFilterProject] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Expenses</h2>
          <p className="text-slate-500 text-sm">Track your overheads and project-related costs.</p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-semibold shadow-sm transition-all">
          <Plus size={18} />
          <span>Add Expense</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-rose-50 rounded-lg text-rose-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Expenses (MTD)</p>
            <p className="text-2xl font-bold text-slate-900">$985.50</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Project Related</p>
            <p className="text-2xl font-bold text-slate-900">$535.00</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
            <Tag size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Most Used Category</p>
            <p className="text-2xl font-bold text-slate-900">Infra</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search expenses..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span className="font-medium">Filter by project:</span>
              <button className="flex items-center space-x-1 px-2 py-1 bg-slate-50 rounded border border-slate-200">
                <span>{filterProject}</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Expense</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MOCK_EXPENSES.map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">{expense.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {expense.project ? (
                      <div className="flex items-center text-indigo-600 text-sm font-medium">
                        <Briefcase size={14} className="mr-1.5" />
                        {expense.project}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Non-project</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{expense.date}</td>
                  <td className="px-6 py-4 text-slate-900 font-bold">${expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center text-xs font-bold ${expense.paid ? 'text-emerald-600' : 'text-amber-600'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${expense.paid ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                      {expense.paid ? 'Settled' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={18} />
                    </button>
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

export default ExpenseList;
