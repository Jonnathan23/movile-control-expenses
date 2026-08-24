import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/create-transaction.dto";
import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/update-transaction.dto";

export interface TransactionDtoFactory {
    createCreateTransactionDto(rawData: unknown): CreateTransactionDto;
    createUpdateTransactionDto(rawData: unknown): UpdateTransactionDto;
}
