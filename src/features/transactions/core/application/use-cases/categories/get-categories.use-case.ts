import type { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";
import type { CategoriesRepository } from "src/features/transactions/core/domain/repositories/categories.repository";

export class GetCategoriesUseCase {
    public constructor(private readonly categoriesRepository: CategoriesRepository) {}

    public async execute(): Promise<CategoryEntity[]> {
        return this.categoriesRepository.getCategories();
    }
}
