import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { TransactionRepository } from "src/features/transactions/core/domain/repositories/transaction.repository";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/create-transaction.dto";

export class SaveTransactionUseCase {
    public constructor(private readonly transactionRepository: TransactionRepository) {}

    public execute(dto: CreateTransactionDto): Promise<TransactionEntity> {
        return this.transactionRepository.saveTransaction(dto);
    }
}
