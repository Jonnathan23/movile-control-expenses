import { TransactionDataSource } from "src/features/transactions/core/domain/datasources/transaction.datasource";
import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { TransactionRepository } from "src/features/transactions/core/domain/repositories/transaction.repository";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/create-transaction.dto";
import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/update-transaction.dto";

export class TransactionRepositoryImpl implements TransactionRepository {
    public constructor(private readonly transactionDataSource: TransactionDataSource) {}

    public getTransactions(): Promise<TransactionEntity[]> {
        return this.transactionDataSource.getTransactions();
    }

    public saveTransaction(dto: CreateTransactionDto): Promise<TransactionEntity> {
        return this.transactionDataSource.saveTransaction(dto);
    }

    public updateTransaction(dto: UpdateTransactionDto): Promise<TransactionEntity> {
        return this.transactionDataSource.updateTransaction(dto);
    }

    public deleteTransaction(id: string): Promise<void> {
        return this.transactionDataSource.deleteTransaction(id);
    }
}
