export type ClientStatus = 'Lead' | 'Prospect' | 'Negotiation' | 'Closed' | 'Lost';

export interface Client {
    id: string;
    name: string;
    email: string;
    company: string;
    status: ClientStatus;
    value: number;
    lastContact: string;
}

export type TransactionType = 'Income' | 'Expense';

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    date: string;
    description: string;
    category: string;
}

export interface ClientLog {
    id: string;
    client_id: string;
    created_at: string;
    content: string;
}
