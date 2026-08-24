import type { EntityValidator } from "src/shared/core/adapters/validators/domain/interfaces/entity-validator.interface";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/create-transaction.dto";
import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/update-transaction.dto";

export interface TransactionValidatorContainer {
    createTransactionValidator: EntityValidator<CreateTransactionDto>;
    updateTransactionValidator: EntityValidator<UpdateTransactionDto>;
}
