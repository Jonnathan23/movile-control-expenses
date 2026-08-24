import type { ValidatorCreator } from "src/shared/core/helpers/create-validator.helper";

import type { CreateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/create-transaction.dto";
import type { UpdateTransactionDto } from "src/features/transactions/core/application/dtos/transactions/update-transaction.dto";
import type { TransactionValidatorContainer } from "src/features/transactions/core/application/validators/transaction/interfaces/container-response.interface";
import type { GenerateValidatorTransactionContainer } from "src/features/transactions/core/application/validators/transaction/interfaces/generate-container.interface";
import { CreateTransactionValidateSchema } from "src/features/transactions/core/application/validators/transaction/schemas/create-transaction.schema";
import { UpdateTransactionValidateSchema } from "src/features/transactions/core/application/validators/transaction/schemas/update-transaction.schema";

export class TransactionZodValidatorContainer implements GenerateValidatorTransactionContainer {
    public constructor(private readonly validatorCreator: ValidatorCreator) {}

    public generateTransactionValidators(): TransactionValidatorContainer {
        const createTransactionValidator = this.validatorCreator<CreateTransactionDto>(CreateTransactionValidateSchema);
        const updateTransactionValidator = this.validatorCreator<UpdateTransactionDto>(UpdateTransactionValidateSchema);

        return {
            createTransactionValidator,
            updateTransactionValidator,
        };
    }
}
