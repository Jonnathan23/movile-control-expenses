import { CustomError } from "src/shared/core/errors/custom-error.error";

import { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";

export interface CategoryMapper {
    toEntity(rawObject: unknown): CategoryEntity;
    toArrayEntities(rawArray: unknown[]): CategoryEntity[];
}

export class CategoryMapperImpl implements CategoryMapper {
    public toEntity(rawObject: unknown): CategoryEntity {
        const { id, name, icon, color } = rawObject as Record<string, unknown>;

        if (!id || typeof id !== "string") throw CustomError.badRequest({ payload: [], path: "id" });
        if (!name || typeof name !== "string") throw CustomError.badRequest({ payload: [], path: "name" });
        if (!icon || typeof icon !== "string") throw CustomError.badRequest({ payload: [], path: "icon" });
        if (!color || typeof color !== "string") throw CustomError.badRequest({ payload: [], path: "color" });

        return new CategoryEntity({
            id,
            name,
            icon,
            color,
        });
    }

    public toArrayEntities(rawArray: unknown[]): CategoryEntity[] {
        if (!Array.isArray(rawArray)) return [];
        return rawArray.map((item) => this.toEntity(item));
    }
}
