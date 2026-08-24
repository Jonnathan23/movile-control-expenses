import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { TransactionRepository } from "src/features/transactions/core/domain/repositories/transaction.repository";

export class GetTransactionsUseCase {
    public constructor(private readonly transactionRepository: TransactionRepository) {}

    public execute(): Promise<TransactionEntity[]> {
        return this.transactionRepository.getTransactions();
    }
}
