import { CustomError } from "src/shared/core/errors/custom-error.error";

import { AccountEntity } from "src/features/accounts/core/domain/entities/account.entity";

export class AccountMapper {
    public toArrayEntities(objects: unknown[]): AccountEntity[] {
        return objects.map((obj) => this.toEntity(obj));
    }

    public toEntity(object: unknown): AccountEntity {
        const { id, name, balance, icon } = object as Record<string, unknown>;

        if (!id || typeof id !== "string") throw CustomError.badRequest({ payload: [], path: "id" });
        if (!name || typeof name !== "string") throw CustomError.badRequest({ payload: [], path: "name" });
        if (typeof balance !== "number") throw CustomError.badRequest({ payload: [], path: "balance" });
        if (!icon || typeof icon !== "string") throw CustomError.badRequest({ payload: [], path: "icon" });

        return new AccountEntity({
            id,
            name,
            balance,
            icon,
        });
    }
}
