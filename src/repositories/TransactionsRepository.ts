import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    let income = 0;
    let outcome = 0;
    let total = 0;
    transactions.forEach(t => {
      if (t.type === 'income') {
        income += t.value;
        total += t.value;
      } else if (t.type === 'outcome') {
        outcome += t.value;
        total -= t.value;
      }
    });
    return { income, outcome, total };
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
