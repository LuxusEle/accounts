
import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4500, expenses: 2400 },
  { name: 'Feb', revenue: 5200, expenses: 2800 },
  { name: 'Mar', revenue: 4800, expenses: 3100 },
  { name: 'Apr', revenue: 6100, expenses: 2900 },
  { name: 'May', revenue: 5900, expenses: 3400 },
  { name: 'Jun', revenue: 7200, expenses: 3600 },
];

const StatCard = ({ title, value, change, icon: Icon, colorClass }: { title: string, value: string, change: string, icon: any, colorClass: string }) => (
  <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${parseFloat(change) > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {parseFloat(change) > 0 ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
        {change}%
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">{title}</h3>
    <p className="text-3xl font-black text-slate-900 mt-2 tracking-tight group-hover:text-brand-gradient transition-all">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Financial Health</h2>
          <p className="text-slate-400 font-medium mt-1">Real-time performance metrics for your software venture.</p>
        </div>
        <div className="flex space-x-3 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button className="px-4 py-2 bg-slate-50 text-slate-900 rounded-lg text-sm font-bold">30 Days</button>
          <button className="px-4 py-2 text-slate-400 rounded-lg text-sm font-bold hover:bg-slate-50">90 Days</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Revenue" value="$24,500" change="+12.5" icon={DollarSign} colorClass="bg-brand-gradient" />
        <StatCard title="Awaiting" value="$8,200" change="-2.4" icon={Clock} colorClass="bg-amber-500" />
        <StatCard title="Collected" value="$16,300" change="+18.2" icon={CheckCircle2} colorClass="bg-emerald-500" />
        <StatCard title="Expenses" value="$12,140" change="+5.1" icon={AlertCircle} colorClass="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-bold text-slate-800 text-lg">Cash Flow Performance</h3>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-teal-500 shadow-md shadow-teal-500/20"></div>
                <span className="text-xs text-slate-400 font-bold uppercase">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <span className="text-xs text-slate-400 font-bold uppercase">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="8 8" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-8">Live Feed</h3>
          <div className="space-y-8">
            {[
              { label: 'Invoice #B2U-001 fully paid', time: '2h ago', color: 'bg-emerald-500' },
              { label: 'AWS Cloud billing recorded', time: '5h ago', color: 'bg-rose-500' },
              { label: 'New Quote: Acme SaaS Project', time: 'Yesterday', color: 'bg-blue-500' },
              { label: 'Client Globex Ltd onboarded', time: '2d ago', color: 'bg-teal-500' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className={`mt-1.5 w-3 h-3 rounded-full ${activity.color} ring-4 ring-white shadow-sm`}></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 leading-tight">{activity.label}</p>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-12 py-3 text-sm font-bold text-white bg-brand-gradient rounded-xl shadow-lg transition-all hover:scale-[1.02]">
            View Financial Audit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
