import { Preferences } from "@capacitor/preferences";

import { CustomError } from "src/shared/core/errors/custom-error.error";
import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import { TransactionDataSource } from "src/features/transactions/core/domain/datasources/transaction.datasource";
import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";

import type { TransactionMapper } from "src/features/transactions/core/infrastructure/mappers/transaction.mapper";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/create-transaction.dto";
import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/update-transaction.dto";

export class TransactionDataSourcePreferences implements TransactionDataSource {
    private readonly storageKey = "transactions";

    public constructor(
        private readonly transactionMapper: TransactionMapper,
        private readonly generatorUUID: UUIDHelper,
    ) {}

    public async getTransactionsById(id: string): Promise<TransactionEntity> {
        const { value } = await Preferences.get({ key: this.storageKey });
        const rawData: Record<string, unknown>[] = value ? JSON.parse(value) : [];

        const rawTransaction = rawData.find((transaction) => transaction.id === id);
        if (!rawTransaction)
            throw CustomError.notFound({
                message: "Transaction not found",
                path: "search transaction",
            });

        return this.transactionMapper.toEntity(rawTransaction);
    }

    public async getTransactions(): Promise<TransactionEntity[]> {
        const { value } = await Preferences.get({ key: this.storageKey });
        const rawData = value ? JSON.parse(value) : [];
        return this.transactionMapper.toArrayEntities(rawData);
    }

    public async saveTransaction(transaction: TransactionEntity): Promise<void> {
        try {
            const transactions = await this.getTransactions();
            const index = transactions.findIndex((t) => t.id === transaction.id);

            const newTransaction = new TransactionEntity({
                id: transaction.id,
                type: transaction.type,
                amount: transaction.amount,
                categoryId: transaction.categoryId,
                categoryName: transaction.categoryName,
                description: transaction.description,
                accountId: transaction.accountId,
                date: transaction.date,
            });

            if (index !== -1) {
                transactions[index] = newTransaction;
            } else {
                transactions.push(newTransaction);
            }

            await Preferences.set({
                key: this.storageKey,
                value: JSON.stringify(transactions),
            });
        } catch {
            throw CustomError.internalServer({
                message: "Error saving transaction",
                path: "saveTransaction",
            });
        }
    }

    public async createTransaction(dto: CreateTransactionDto): Promise<TransactionEntity> {
        const newTransaction = new TransactionEntity({
            id: this.generatorUUID(),
            type: dto.type,
            amount: dto.amount,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            description: dto.description,
            accountId: dto.accountId,
            date: dto.date,
        });

        return newTransaction;
    }

    public async updateTransaction(id: string, dto: UpdateTransactionDto): Promise<TransactionEntity> {
        const updatedTransaction = new TransactionEntity({
            id,
            type: dto.type,
            amount: dto.amount,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            description: dto.description,
            accountId: dto.accountId,
            date: dto.date,
        });

        return updatedTransaction;
    }

    public async deleteTransaction(id: string): Promise<void> {
        const transactions = await this.getTransactions();
        const filtered = transactions.filter((exp) => exp.id !== id);
        await Preferences.set({
            key: this.storageKey,
            value: JSON.stringify(filtered),
        });
    }
}
