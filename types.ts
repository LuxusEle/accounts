
export enum ItemStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export enum QuoteStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED'
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  companyName?: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  date: string;
  dueDate: string;
  items: LineItem[];
  status: ItemStatus;
  notes?: string;
  isRecurring: boolean;
  frequency?: 'monthly' | 'quarterly' | 'yearly';
  taxRate: number;
  projectId?: string;
}

export interface Quote {
  id: string;
  number: string;
  clientId: string;
  date: string;
  expiryDate: string;
  items: LineItem[];
  status: QuoteStatus;
  taxRate: number;
  notes?: string;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  projectId?: string; // Optional: can be project related or not
  isPaid: boolean;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  budget?: number;
}
