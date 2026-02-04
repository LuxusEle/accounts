
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Printer, 
  Send,
  Calendar,
  CreditCard,
  Repeat,
  Info
} from 'lucide-react';
import { LineItem } from '../types';
import { Logo } from './Logo';

const InvoiceForm: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: 'Product Design & Branding', quantity: 1, rate: 2500 },
    { id: '2', description: 'React App Development (Sprint 1)', quantity: 80, rate: 125 }
  ]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [conditions, setConditions] = useState("1. Payment is due within 30 days of the invoice date.\n2. Late payments incur a 2% monthly interest fee.\n3. Digital assets remain B2U property until full payment.");

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), description: '', quantity: 1, rate: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="space-y-8">
      <div className="no-print flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center space-x-2 text-slate-400 hover:text-slate-800 font-bold transition-all"
        >
          <ArrowLeft size={20} />
          <span>Discard & Back</span>
        </button>
        <div className="flex space-x-4">
          <button className="px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
            Save Draft
          </button>
          <button className="px-6 py-3 bg-brand-gradient text-white rounded-xl text-sm font-bold flex items-center space-x-2 shadow-xl shadow-teal-500/20 hover:scale-105 transition-all">
            <Send size={18} />
            <span>Issue Invoice</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {/* Main Invoice Document */}
          <div className="print-container bg-white p-12 rounded-2xl border border-slate-200 shadow-2xl relative overflow-hidden">
             {/* Header Design Strip */}
             <div className="absolute top-0 left-0 right-0 h-2 bg-brand-gradient"></div>
             
             <div className="flex justify-between items-start mb-16">
              <div className="space-y-6">
                <Logo size="lg" />
                <div className="pt-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">From</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    B2U Application Development Ltd.<br />
                    77 Innovation Drive, Tech City<br />
                    London, EC1V 2NX<br />
                    vat: GB123456789
                  </p>
                </div>
              </div>
              <div className="text-right space-y-6">
                <h2 className="text-5xl font-black text-brand-gradient opacity-90 tracking-tighter">INVOICE</h2>
                <div className="space-y-3">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Document No.</span>
                    <input type="text" className="text-xl font-bold text-slate-900 border-none bg-transparent p-0 text-right focus:ring-0 w-40" defaultValue="#B2U-2024-042" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Billing Date</span>
                    <input type="date" className="text-sm font-bold text-slate-600 border-none bg-transparent p-0 text-right focus:ring-0" defaultValue="2024-03-24" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-20 mb-16 py-8 border-y border-slate-100">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Recipient</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <select className="w-full bg-transparent border-none p-0 text-slate-900 font-bold focus:ring-0 mb-2">
                    <option>Acme Corporation Inc.</option>
                    <option>Globex Systems</option>
                  </select>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    accounts@acme-corp.com<br />
                    101 Enterprise Way, Suite 400<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Meta</h4>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500 font-medium">Terms</span>
                     <span className="text-slate-900 font-bold">Net 30 Days</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500 font-medium">Due By</span>
                     <span className="text-emerald-600 font-black px-2 py-1 bg-emerald-50 rounded-lg flex items-center">
                        <Calendar size={12} className="mr-1.5" />
                        April 23, 2024
                     </span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-500 font-medium">Recurring</span>
                     <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded-md border-slate-300 text-teal-600 focus:ring-teal-500 mr-2"
                          checked={isRecurring}
                          onChange={(e) => setIsRecurring(e.target.checked)}
                        />
                        <span className={`text-[10px] font-black uppercase ${isRecurring ? 'text-teal-600' : 'text-slate-300'}`}>Monthly</span>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-16">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/2">Description & Service</th>
                    <th className="pb-6 px-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                    <th className="pb-6 px-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Rate</th>
                    <th className="pb-6 px-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                    <th className="pb-6 pl-4 w-8 no-print"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="group">
                      <td className="py-6">
                        <input 
                          type="text"
                          className="w-full font-bold text-slate-800 placeholder-slate-300 focus:ring-2 focus:ring-teal-100 rounded-lg border-none bg-transparent group-hover:bg-slate-50 transition-all p-2 -ml-2"
                          placeholder="Line item description..."
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        />
                      </td>
                      <td className="py-6 px-4 text-center">
                        <input 
                          type="number"
                          className="w-16 text-center font-bold text-slate-600 border-none bg-transparent group-hover:bg-slate-50 rounded-lg p-2 focus:ring-2 focus:ring-teal-100"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td className="py-6 px-4 text-right">
                        <div className="flex items-center justify-end text-slate-600 font-bold group-hover:bg-slate-50 rounded-lg px-2">
                          <span className="text-slate-300 mr-1">$</span>
                          <input 
                            type="number"
                            className="w-24 text-right border-none bg-transparent p-2 focus:ring-0"
                            value={item.rate}
                            onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </td>
                      <td className="py-6 px-4 text-right font-black text-slate-900">
                        ${(item.quantity * item.rate).toLocaleString()}
                      </td>
                      <td className="py-6 pl-4 text-right no-print">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button 
                onClick={addItem}
                className="no-print mt-6 flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-black text-xs uppercase tracking-widest transition-all"
              >
                <Plus size={16} className="bg-teal-50 rounded-full p-0.5" />
                <span>Add Service Line</span>
              </button>
            </div>

            {/* Calculations and T&C */}
            <div className="flex flex-col md:flex-row gap-16 pt-12 border-t border-slate-100">
              <div className="flex-1 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <Info size={12} className="mr-1.5" /> Conditions & Terms
                </h4>
                <textarea 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500 font-medium focus:ring-2 focus:ring-teal-100 focus:bg-white transition-all leading-relaxed"
                  rows={4}
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                />
              </div>
              <div className="w-full md:w-80 space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                  <span>Taxation (10%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Payable</span>
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.3em]">Built with B2U Financial Technology</p>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="no-print lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest border-b border-slate-100 pb-4">Document Actions</h4>
            
            <button 
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center space-x-3 shadow-lg shadow-slate-900/10 hover:scale-[1.02] transition-all"
              onClick={() => window.print()}
            >
              <Printer size={18} />
              <span>Download PDF</span>
            </button>

            <div className="pt-4 space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Direct Link</label>
              <div className="flex items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <input readOnly value="b2u.app/v/INV-042" className="flex-1 bg-transparent border-none text-xs font-bold text-slate-500 focus:ring-0" />
                <button className="text-teal-600 font-black text-[10px] uppercase">Copy</button>
              </div>
            </div>
          </div>

          <div className="bg-brand-gradient p-1 rounded-2xl shadow-2xl">
            <div className="bg-white p-8 rounded-2xl space-y-6">
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest border-b border-slate-100 pb-4">Settings</h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center space-x-3">
                       <Repeat size={16} className="text-teal-500" />
                       <span className="text-xs font-bold text-slate-700">Recurring Billing</span>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${isRecurring ? 'bg-teal-500' : 'bg-slate-200'}`} onClick={() => setIsRecurring(!isRecurring)}>
                       <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isRecurring ? 'right-1' : 'left-1'}`}></div>
                    </div>
                 </div>
                 <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <CreditCard size={16} className="text-blue-500" />
                    <span className="text-xs font-bold text-slate-700">Accept Card Payments</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
