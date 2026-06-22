import { ExpenseEntity } from "src/features/expenses/core/domain/entities/expense.entity";

export interface ExpenseMapper {
    toEntity(rawObject: Record<string, unknown>): ExpenseEntity;
    toArrayEntities(rawObjects: Record<string, unknown>[]): ExpenseEntity[];
}

export class ExpenseMapperImpl implements ExpenseMapper {
    public toEntity(rawObject: Record<string, unknown>): ExpenseEntity {
        if (!rawObject) throw new Error("Data is missing");
        return new ExpenseEntity(
            rawObject.id as string,
            rawObject.expenseName as string,
            rawObject.amount as number,
            rawObject.category as string,
            new Date(rawObject.date as string | number | Date),
        );
    }

    public toArrayEntities(rawObjects: Record<string, unknown>[]): ExpenseEntity[] {
        return rawObjects.map((obj) => this.toEntity(obj));
    }
}
