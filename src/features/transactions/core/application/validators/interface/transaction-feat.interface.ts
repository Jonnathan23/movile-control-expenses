import type { BudgetValidatorContainer } from "src/features/transactions/core/application/validators/budget/interfaces/container-response.interface";
import type { TransactionValidatorContainer } from "src/features/transactions/core/application/validators/transaction/interfaces/container-response.interface";

export interface TransactionFeatureValidator {
    budgetValidatorContainer: BudgetValidatorContainer;
    transactionValidatorContainer: TransactionValidatorContainer;
}
