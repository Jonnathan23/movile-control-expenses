import { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";

export interface CategoryMapper {
    toEntity(rawObject: unknown): CategoryEntity;
    toArrayEntities(rawArray: unknown[]): CategoryEntity[];
}

export class CategoryMapperImpl implements CategoryMapper {
    public toEntity(rawObject: Record<string, unknown>): CategoryEntity {
        return new CategoryEntity(
            typeof rawObject.id === "string" ? rawObject.id : "",
            typeof rawObject.name === "string" ? rawObject.name : "",
            typeof rawObject.icon === "string" ? rawObject.icon : "",
        );
    }

    public toArrayEntities(rawArray: unknown[]): CategoryEntity[] {
        if (!Array.isArray(rawArray)) return [];
        return rawArray.map((item) => this.toEntity(item as Record<string, unknown>));
    }
}
