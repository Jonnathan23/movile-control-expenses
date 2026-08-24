import { createValidator, type ValidatorCreator } from "src/shared/core/helpers/create-validator.helper";

import { BudgetZodValidatorContainer } from "src/features/transactions/core/application/validators/budget/budget-container.validator";
import type { TransactionFeatureValidator } from "src/features/transactions/core/application/validators/interface/transaction-feat.interface";
import { TransactionZodValidatorContainer } from "src/features/transactions/core/application/validators/transaction/transaction-container.validator";

const validator: ValidatorCreator = createValidator;

const budgetValidators = new BudgetZodValidatorContainer(validator);
const transactionValidators = new TransactionZodValidatorContainer(validator);

export const validatorTransactionFeatureContainer: TransactionFeatureValidator = {
    budgetValidatorContainer: budgetValidators.generateBudgetValidators(),
    transactionValidatorContainer: transactionValidators.generateTransactionValidators(),
};
