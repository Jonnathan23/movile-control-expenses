import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { TransactionRepository } from "src/features/transactions/core/domain/repositories/transaction.repository";

import type { TransactionDtoFactory } from "src/features/transactions/core/application/factories/interfaces/transaction-dto-factory.interface";

export class CreateTransactionUseCase {
    public constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly transactionDtoFactory: TransactionDtoFactory,
    ) {}

    public async execute(rawData: unknown): Promise<TransactionEntity> {
        const dto = this.transactionDtoFactory.createCreateTransactionDto(rawData);

        const newTransaction = await this.transactionRepository.createTransaction(dto);

        await this.transactionRepository.saveTransaction(newTransaction);

        return newTransaction;
    }
}
