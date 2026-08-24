import type { TransactionValidatorContainer } from "src/features/transactions/core/application/validators/transaction/interfaces/container-response.interface";

export abstract class GenerateValidatorTransactionContainer {
    public abstract generateTransactionValidators(): TransactionValidatorContainer;
}
