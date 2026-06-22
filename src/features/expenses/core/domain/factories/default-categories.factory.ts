import { CategoryEntity } from "src/features/expenses/core/domain/entities/category.entity";
import type { UuidStrategy } from "src/shared/adapters/uuid/domain/interface/uuid-strategy.interface";

export class DefaultCategoriesFactory {
    constructor(private uuidGenerator: UuidStrategy) {}

    public create(): CategoryEntity[] {
        return [
            new CategoryEntity(this.uuidGenerator.generateUuid(), "Ahorro", "ahorro"),
            new CategoryEntity(this.uuidGenerator.generateUuid(), "Comida", "comida"),
            new CategoryEntity(this.uuidGenerator.generateUuid(), "Casa", "casa"),
            new CategoryEntity(this.uuidGenerator.generateUuid(), "Gastos Varios", "gastos"),
            new CategoryEntity(this.uuidGenerator.generateUuid(), "Ocio", "ocio"),
            new CategoryEntity(this.uuidGenerator.generateUuid(), "Salud", "salud"),
            new CategoryEntity(this.uuidGenerator.generateUuid(), "Suscripciones", "suscripciones"),
        ];
    }
}
