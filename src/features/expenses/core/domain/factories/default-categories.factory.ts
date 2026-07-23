import type { UUIDHelper } from "src/shared/core/helpers/generators.helper";

import { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";

export interface DefaultCategoriesFactory {
    create(): CategoryEntity[];
}

export class DefaultCategoriesFactoryImpl implements DefaultCategoriesFactory {
    public constructor(private readonly uuidGenerator: UUIDHelper) {}

    public create(): CategoryEntity[] {
        return [
            new CategoryEntity(this.uuidGenerator(), "Ahorro", "ahorro"),
            new CategoryEntity(this.uuidGenerator(), "Comida", "comida"),
            new CategoryEntity(this.uuidGenerator(), "Casa", "casa"),
            new CategoryEntity(this.uuidGenerator(), "Gastos Varios", "gastos"),
            new CategoryEntity(this.uuidGenerator(), "Ocio", "ocio"),
            new CategoryEntity(this.uuidGenerator(), "Salud", "salud"),
            new CategoryEntity(this.uuidGenerator(), "Suscripciones", "suscripciones"),
        ];
    }
}
