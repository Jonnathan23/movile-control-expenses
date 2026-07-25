import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/create-transaction.dto";
import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/update-transaction.dto";

export abstract class TransactionDataSource {
    public abstract getTransactions(): Promise<TransactionEntity[]>;
    public abstract saveTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity>;
    public abstract updateTransaction(updateTransactionDto: UpdateTransactionDto): Promise<TransactionEntity>;
    public abstract deleteTransaction(id: string): Promise<void>;
}
