import { TransactionDataSource } from "src/features/transactions/core/domain/datasources/transaction.datasource";
import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { TransactionRepository } from "src/features/transactions/core/domain/repositories/transaction.repository";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/create-transaction.dto";
import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/update-transaction.dto";

export class TransactionRepositoryImpl implements TransactionRepository {
    public constructor(private readonly transactionDataSource: TransactionDataSource) {}

    public getTransactionsById(id: string): Promise<TransactionEntity> {
        return this.transactionDataSource.getTransactionsById(id);
    }

    public saveTransaction(transaction: TransactionEntity): Promise<void> {
        return this.transactionDataSource.saveTransaction(transaction);
    }

    public createTransaction(createDto: CreateTransactionDto): Promise<TransactionEntity> {
        return this.transactionDataSource.createTransaction(createDto);
    }

    public updateTransaction(id: string, updateDto: UpdateTransactionDto): Promise<TransactionEntity> {
        return this.transactionDataSource.updateTransaction(id, updateDto);
    }

    public deleteTransaction(id: string): Promise<void> {
        return this.transactionDataSource.deleteTransaction(id);
    }

    public getTransactions(): Promise<TransactionEntity[]> {
        return this.transactionDataSource.getTransactions();
    }
}
