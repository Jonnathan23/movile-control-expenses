import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import type { TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

export interface TransactionMapper {
    toEntity(rawObject: Record<string, unknown>): TransactionEntity;
    toArrayEntities(rawObjects: Record<string, unknown>[]): TransactionEntity[];
}

export class TransactionMapperImpl implements TransactionMapper {
    public toEntity(rawObject: Record<string, unknown>): TransactionEntity {
        if (!rawObject) throw new Error("Data is missing");
        return new TransactionEntity(
            rawObject.id as string,
            rawObject.type as TransactionType,
            rawObject.amount as number,
            rawObject.category as string,
            rawObject.description as string,
            rawObject.accountId as string,
            new Date(rawObject.date as string | number | Date),
        );
    }

    public toArrayEntities(rawObjects: Record<string, unknown>[]): TransactionEntity[] {
        return rawObjects.map((obj) => this.toEntity(obj));
    }
}
