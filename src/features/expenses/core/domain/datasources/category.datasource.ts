import type { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";

export abstract class CategoryDatasource {
    abstract getCategories(): Promise<CategoryEntity[]>;
}
