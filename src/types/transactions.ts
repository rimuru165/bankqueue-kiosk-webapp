export interface FormData {
  accountNumber: string;
  amount: string;
  firstName: string;
  lastName: string;
  loanType: "open" | "pay";
  monthlyInterest: string;
}

export interface TransactionData {
  account_ID?: string;
  amount?: number;
  firstname?: string;
  lastname?: string;
  monthly_interest?: number;
  type: string;
}

export interface ServerResponse {
  queue_number: string;
  account_ID?: string;
  amount?: number;
  firstname?: string;
  lastname?: string;
  monthly_interest?: number;
}