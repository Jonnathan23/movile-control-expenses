import { CustomError } from "src/shared/core/errors/custom-error.error";

import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { TransactionRepository } from "src/features/transactions/core/domain/repositories/transaction.repository";

import type { TransactionDtoFactory } from "src/features/transactions/core/application/factories/interfaces/transaction-dto-factory.interface";

export class UpdateTransactionUseCase {
    public constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly transactionDtoFactory: TransactionDtoFactory,
    ) {}

    public async execute(id: string, rawDto: unknown): Promise<TransactionEntity> {
        const dto = this.transactionDtoFactory.createUpdateTransactionDto(rawDto);

        const searchTransaction = await this.transactionRepository.getTransactionsById(id);

        if (!searchTransaction) {
            throw CustomError.notFound({
                message: "Transaction not found",
                path: "updateTransaction",
            });
        }
        const updatedTransaction = await this.transactionRepository.updateTransaction(id, dto);

        await this.transactionRepository.saveTransaction(updatedTransaction);

        return updatedTransaction;
    }
}
