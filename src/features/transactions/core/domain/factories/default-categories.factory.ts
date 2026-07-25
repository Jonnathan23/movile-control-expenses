import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import { CategoryEntity } from "src/features/transactions/core/domain/entities/category.entity";

export interface DefaultCategoriesFactory {
    create(): CategoryEntity[];
}

export class DefaultCategoriesFactoryImpl implements DefaultCategoriesFactory {
    public constructor(private readonly uuidGenerator: UUIDHelper) {}

    public create(): CategoryEntity[] {
        return [
            new CategoryEntity(this.uuidGenerator(), "food", "Alimentos", "🍔", "#f97316"),
            new CategoryEntity(this.uuidGenerator(), "transport", "Transporte", "🚗", "#3b82f6"),
            new CategoryEntity(this.uuidGenerator(), "entertainment", "Ocio", "🎬", "#a855f7"),
            new CategoryEntity(this.uuidGenerator(), "health", "Salud", "💊", "#ec4899"),
            new CategoryEntity(this.uuidGenerator(), "shopping", "Compras", "🛍️", "#eab308"),
            new CategoryEntity(this.uuidGenerator(), "bills", "Servicios", "⚡", "#14b8a6"),
            new CategoryEntity(this.uuidGenerator(), "education", "Educación", "📚", "#6366f1"),
            new CategoryEntity(this.uuidGenerator(), "other", "Otros", "📦", "#6b7280"),
        ];
    }
}
