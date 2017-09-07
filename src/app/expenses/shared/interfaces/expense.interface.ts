export interface Expense {
  amount: number;
  approved: boolean;
  description: string;
  employee: string
  eventDatetime: Date;
  expenseDatetime: Date;
  receiptPhotoUrl: string[];
  reviewedBy: string;
}