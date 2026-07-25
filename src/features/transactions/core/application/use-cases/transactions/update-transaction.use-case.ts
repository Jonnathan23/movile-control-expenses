import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { TransactionRepository } from "src/features/transactions/core/domain/repositories/transaction.repository";

import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/update-transaction.dto";

export class UpdateTransactionUseCase {
    public constructor(private readonly transactionRepository: TransactionRepository) {}

    public execute(dto: UpdateTransactionDto): Promise<TransactionEntity> {
        return this.transactionRepository.updateTransaction(dto);
    }
}
