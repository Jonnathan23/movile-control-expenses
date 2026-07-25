import { TransactionRepository } from "src/features/transactions/core/domain/repositories/transaction.repository";

export class DeleteTransactionUseCase {
    public constructor(private readonly transactionRepository: TransactionRepository) {}

    public execute(id: string): Promise<void> {
        return this.transactionRepository.deleteTransaction(id);
    }
}
