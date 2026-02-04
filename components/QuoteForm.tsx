
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Send } from 'lucide-react';

const QuoteForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Quotes</span>
        </button>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center space-x-2 shadow-sm hover:bg-indigo-700">
            <Send size={16} />
            <span>Send Quote</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Create New Quote</h2>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
             <label className="block text-sm font-medium text-slate-700">Client</label>
             <select className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50">
               <option>Select a Client</option>
               <option>Acme Corp</option>
               <option>Globex Ltd</option>
             </select>
          </div>
          <div className="space-y-4">
             <label className="block text-sm font-medium text-slate-700">Expiry Date</label>
             <input type="date" className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50" />
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-8 text-center py-20 bg-slate-50 rounded-lg border-dashed border-2 text-slate-400">
           Add line items to your proposal to get started.
           <br/>
           <button className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-semibold text-sm hover:bg-slate-50">
             + Add First Item
           </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
