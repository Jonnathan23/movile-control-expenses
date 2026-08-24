import { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import type { TransactionType } from "src/features/transactions/core/domain/enums/transaction.enum";

export interface TransactionMapper {
    toEntity(rawObject: Record<string, unknown>): TransactionEntity;
    toArrayEntities(rawObjects: Record<string, unknown>[]): TransactionEntity[];
}

export class TransactionMapperImpl implements TransactionMapper {
    public toEntity(rawObject: Record<string, unknown>): TransactionEntity {
        if (!rawObject) throw new Error("Data is missing");
        return new TransactionEntity({
            id: rawObject.id as string,
            type: rawObject.type as TransactionType,
            amount: rawObject.amount as number,
            categoryId: rawObject.categoryId as string,
            categoryName: rawObject.categoryName as string,
            description: rawObject.description as string,
            accountId: rawObject.accountId as string,
            date: new Date(rawObject.date as string | number | Date),
        });
    }

    public toArrayEntities(rawObjects: Record<string, unknown>[]): TransactionEntity[] {
        return rawObjects.map((obj) => this.toEntity(obj));
    }
}
