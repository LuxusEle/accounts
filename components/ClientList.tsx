
import React from 'react';
import { 
  Users, 
  Mail, 
  MapPin, 
  Plus, 
  Search,
  MoreVertical,
  ExternalLink
} from 'lucide-react';

const MOCK_CLIENTS = [
  { id: '1', name: 'John Doe', company: 'Acme Corp', email: 'john@acme.com', location: 'New York, NY', totalBilled: 12500, avatar: 'JD' },
  { id: '2', name: 'Jane Smith', company: 'Globex Ltd', email: 'jane@globex.io', location: 'London, UK', totalBilled: 8200, avatar: 'JS' },
  { id: '3', name: 'Mike Ross', company: 'Soylent Corp', email: 'mike@soylent.com', location: 'San Francisco, CA', totalBilled: 24000, avatar: 'MR' },
  { id: '4', name: 'Harvey Specter', company: 'Pearson Hardman', email: 'h.specter@ph.com', location: 'New York, NY', totalBilled: 45000, avatar: 'HS' },
];

const ClientList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Clients</h2>
          <p className="text-slate-500 text-sm">Manage your relationships and billing profiles.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-semibold shadow-sm transition-all">
          <Plus size={18} />
          <span>Add New Client</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search clients..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {MOCK_CLIENTS.map((client) => (
            <div key={client.id} className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-lg hover:border-indigo-100 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                  {client.avatar}
                </div>
                <button className="text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{client.name}</h3>
              <p className="text-slate-500 text-sm font-medium mb-4">{client.company}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-600 text-sm">
                  <Mail size={14} className="mr-2 text-slate-400" />
                  {client.email}
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <MapPin size={14} className="mr-2 text-slate-400" />
                  {client.location}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lifetime Value</p>
                  <p className="text-slate-900 font-bold">${client.totalBilled.toLocaleString()}</p>
                </div>
                <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientList;
