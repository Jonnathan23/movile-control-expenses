---
name: create-util-strategy
description: crear una nueva utilidad aplicando el patrón Strategy en el core del proyecto. Este patrón ayuda a desacoplar las implementaciones específicas (ej. librerías externas o APIs nativas como `Intl`) de los casos de uso y componentes que las consumen.
---

## Estructura de Directorios

Toda nueva estrategia debe encapsularse como un adaptador dentro de `src/shared/core/adapters/[feature]/` siguiendo esta estructura:

```text
adapters/
  └── [feature]/
      ├── di/
      │   └── [feature].dependencies.ts
      ├── domain/
      │   ├── context/
      │   │   └── [feature].context.ts
      │   └── interface/
      │       └── [feature]-strategy.interface.ts
      └── infrastructure/
          └── strategies/
              └── [implementation]-[feature].strategy.ts
```

## Pasos de Implementación

### 1. Definir la Interfaz de la Estrategia (Domain)

Crea la interfaz que define el contrato de la utilidad en `domain/interface/`.

```typescript
// src/shared/core/adapters/[feature]/domain/interface/[feature]-strategy.interface.ts
export interface FeatureStrategy {
    executeMethod(param: string): string;
}
```

### 2. Crear el Contexto (Domain)

El contexto mantiene una referencia a la estrategia y delega la ejecución. **Nota importante:** En el constructor se debe utilizar el método `setStrategy` para la asignación.

```typescript
// src/shared/core/adapters/[feature]/domain/context/[feature].context.ts
import type { FeatureStrategy } from "../interface/[feature]-strategy.interface";

export class FeatureContext implements FeatureStrategy {
    private strategy: FeatureStrategy;

    constructor(strategy: FeatureStrategy) {
        this.setStrategy(strategy);
    }

    public setStrategy(strategy: FeatureStrategy): void {
        this.strategy = strategy;
    }

    public executeMethod(param: string): string {
        return this.strategy.executeMethod(param);
    }
}
```

### 3. Implementar la Estrategia Concreta (Infrastructure)

Crea las implementaciones reales (usando librerías específicas o código nativo) en `infrastructure/strategies/`.

```typescript
// src/shared/core/adapters/[feature]/infrastructure/strategies/custom-[feature].strategy.ts
import type { FeatureStrategy } from "../../domain/interface/[feature]-strategy.interface";

export class CustomFeatureStrategy implements FeatureStrategy {
    public executeMethod(param: string): string {
        // Implementación real
        return `Processed: ${param}`;
    }
}
```

### 4. Configurar la Inyección de Dependencias (DI)

Instancia la estrategia, envuélvela en el contexto y expórtala en la capa de `di/`.

```typescript
// src/shared/core/adapters/[feature]/di/[feature].dependencies.ts
import { FeatureContext } from "../domain/context/[feature].context";
import type { FeatureStrategy } from "../domain/interface/[feature]-strategy.interface";
import { CustomFeatureStrategy } from "../infrastructure/strategies/custom-[feature].strategy";

const customStrategy = new CustomFeatureStrategy();
const featureContext = new FeatureContext(customStrategy);

export const adapterFeature: FeatureStrategy = featureContext;
```

### 5. Exponer Globalmente mediante un Helper

Finalmente, para facilitar su uso en toda la aplicación (componentes, casos de uso, etc.), crea un helper en `src/shared/core/helpers/` que re-exporte la instancia configurada.

```typescript
// src/shared/core/helpers/[feature].helper.ts
import { adapterFeature } from "src/shared/core/adapters/[feature]/di/[feature].dependencies";
import type { FeatureStrategy } from "src/shared/core/adapters/[feature]/domain/interface/[feature]-strategy.interface";

export const globalFeatureHelper: FeatureStrategy = adapterFeature;
```

## Beneficios

- **Desacoplamiento:** Los componentes no saben qué librería se utiliza internamente.
- **Flexibilidad:** Cambiar la implementación (ej. de una librería A a una librería B) solo requiere crear una nueva estrategia concreta e inyectarla en el archivo de dependencias.
- **Mantenibilidad:** Sigue una arquitectura limpia y estandarizada en todo el proyecto (como se hace con generadores UUID, formateo de divisas y fechas, etc).
