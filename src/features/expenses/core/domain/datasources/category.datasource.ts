import type { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";

export abstract class CategoryDataSource {
    public abstract getCategories(): Promise<CategoryEntity[]>;
}
