import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";

import {
    type CreateTransactionDto,
    CreateTransactionDtoImpl,
} from "src/features/transactions/core/application/dtos/transactions/create-transaction.dto";
import {
    type UpdateTransactionDto,
    UpdateTransactionDtoImpl,
} from "src/features/transactions/core/application/dtos/transactions/update-transaction.dto";
import type { TransactionDtoFactory } from "src/features/transactions/core/application/factories/interfaces/transaction-dto-factory.interface";

export class TransactionDtoFactoryImpl implements TransactionDtoFactory {
    public constructor(
        private readonly createValidator: EntityValidator<CreateTransactionDto>,
        private readonly updateValidator: EntityValidator<UpdateTransactionDto>,
    ) {}

    public createCreateTransactionDto(rawData: unknown): CreateTransactionDto {
        return CreateTransactionDtoImpl.create(rawData, this.createValidator);
    }

    public createUpdateTransactionDto(rawData: unknown): UpdateTransactionDto {
        return UpdateTransactionDtoImpl.create(rawData, this.updateValidator);
    }
}
