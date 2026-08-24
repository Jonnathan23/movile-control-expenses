import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/create-transaction.dto";
import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/update-transaction.dto";

export abstract class TransactionDataSource {
    public abstract getTransactionsById(id: string): Promise<TransactionEntity>;
    public abstract getTransactions(): Promise<TransactionEntity[]>;
    public abstract saveTransaction(transaction: TransactionEntity): Promise<void>;
    public abstract createTransaction(createDto: CreateTransactionDto): Promise<TransactionEntity>;
    public abstract updateTransaction(id: string, updateDto: UpdateTransactionDto): Promise<TransactionEntity>;
    public abstract deleteTransaction(id: string): Promise<void>;
}
