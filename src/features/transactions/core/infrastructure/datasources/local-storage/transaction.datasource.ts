import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import { TransactionDataSource } from "src/features/transactions/core/domain/datasources/transaction.datasource";
import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import type { TransactionMapper } from "src/features/transactions/core/infrastructure/mappers/transaction.mapper";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/create-transaction.dto";
import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/update-transaction.dto";

export class TransactionDataSourceLocalStorage implements TransactionDataSource {
    private readonly storageKey = "transactions";

    public constructor(
        private readonly transactionMapper: TransactionMapper,
        private readonly generatorUUID: UUIDHelper,
    ) {}

    public async getTransactions(): Promise<TransactionEntity[]> {
        const stored = localStorage.getItem(this.storageKey);
        const rawData = stored ? JSON.parse(stored) : [];
        return this.transactionMapper.toArrayEntities(rawData);
    }

    public async saveTransaction(dto: CreateTransactionDto): Promise<TransactionEntity> {
        const transactions = await this.getTransactions();
        const newTransaction = new TransactionEntity(
            this.generatorUUID(),
            dto.type,
            dto.amount,
            dto.category,
            dto.description,
            dto.accountId,
            dto.date,
        );

        transactions.push(newTransaction);
        localStorage.setItem(this.storageKey, JSON.stringify(transactions));
        return newTransaction;
    }

    public async updateTransaction(dto: UpdateTransactionDto): Promise<TransactionEntity> {
        const transactions = await this.getTransactions();
        const index = transactions.findIndex((exp) => exp.id === dto.id);

        if (index === -1) throw new Error(`Transaction with id ${dto.id} not found`);

        const updatedTransaction = new TransactionEntity(
            dto.id,
            dto.type,
            dto.amount,
            dto.category,
            dto.description,
            dto.accountId,
            dto.date,
        );

        transactions[index] = updatedTransaction;
        localStorage.setItem(this.storageKey, JSON.stringify(transactions));
        return updatedTransaction;
    }

    public async deleteTransaction(id: string): Promise<void> {
        const transactions = await this.getTransactions();
        const filtered = transactions.filter((exp) => exp.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    }
}
