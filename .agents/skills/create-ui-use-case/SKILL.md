---
name: create-ui-use-case
description: Crea hooks en la capa de Presentación para consumir casos de uso utilizando TanStack Query, asegurando tipado estricto y manejando el estado asíncrono sin casteos "as".
---

# Guía para consumir Casos de Uso (UI Layer & TanStack Query)

Al conectar la capa de Presentación con los Casos de Uso de Aplicación, debes hacerlo a través de custom hooks (ej. `use[Action][Feature]`). Estos hooks envuelven las peticiones asíncronas utilizando **TanStack Query** (React Query) y deben cumplir estrictamente con los siguientes patrones.

## 1. Interfaces de Retorno Obligatorias

Todo hook que consuma un caso de uso debe retornar una de las siguientes interfaces estandarizadas ubicadas en `src/shared/presentation/interfaces/tan-stack.interface.ts`:

- **`QueryResult<TData, TError>`**: Se usa para peticiones de obtención de datos (Queries / GET).
- **`MutationResult<TData, TError, TVariables>`**: Se usa para peticiones que modifican estado (Mutations / POST, PUT, DELETE, etc.).

### Regla Estricta: Prohibición de Type Casting (`as`)

Queda **estrictamente prohibido** utilizar la palabra reservada `as` para castear el retorno de TanStack Query hacia estas interfaces. Si TypeScript arroja un error de tipado o no logra inferir los tipos correctos, significa que los objetos, los tipos genéricos del hook o las firmas del caso de uso están mal tipados desde su origen. Debes corregir o revizar el tipado de raíz, **nunca forzarlo**.

### Regla de Manejo de Errores

**NO utilices** la propiedad `onError` dentro de la configuración de `useQuery` o `useMutation`. El proyecto ya cuenta con un sistema global configurado que emite mensajes de error automáticamente. Colocar `onError` a nivel local para lanzar notificaciones o mensajes sería redundante y repetitivo.

## 2. Peticiones de Obtención (Queries - GET)

Para obtener datos, utiliza `useQuery`. Importa el caso de uso pre-orquestado desde la inyección de dependencias (`di/[feature].dependency.ts`) y devuélvelo mapeando los valores al contrato `QueryResult`.

**Ejemplo de implementación (Query):**

```typescript
import { useQuery } from "@tanstack/react-query";
import type { QueryResult } from "src/shared/presentation/interfaces/tan-stack.interface";
import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { ExecuteGetTransactionsUseCase } from "src/features/transactions/core/di/transaction.dependency";

export const useGetTransactions = (): QueryResult<TransactionEntity[]> => {
    const { data, isLoading, isFetching, isError, error, isSuccess, refetch } = useQuery({
        queryKey: ["transactions"],
        queryFn: ExecuteGetTransactionsUseCase,
    });

    return {
        data,
        isLoading,
        isFetching,
        hasError: isError,
        errorDetails: error,
        isSuccessful: isSuccess,
        refetch,
    };
};
```

## 3. Peticiones de Modificación (Mutations - POST/PUT/DELETE)

Para modificar datos, utiliza `useMutation`. El caso de uso se ejecuta dentro de `mutationFn`, recibiendo `unknown` (u otro tipo de variable de entrada). Mapea el resultado hacia `MutationResult`.

En estas peticiones, es común usar el callback `onSuccess` para actualizar un estado local o invalidar queries previas usando `useQueryClient()`.

**Ejemplo de implementación (Mutation):**

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationResult } from "src/shared/presentation/interfaces/tan-stack.interface";
import type { TransactionEntity } from "src/features/transactions/core/domain/entities/transaction.entity";
import { ExecuteCreateTransactionUseCase } from "src/features/transactions/core/di/transaction.dependency";
import type { BudgetActions } from "src/features/transactions/presentation/reducers/budget.reducer";

interface UseSaveTransactionProps {
    dispatch: (value: BudgetActions) => void;
}

export const useCreateTransaction = (props: UseSaveTransactionProps): MutationResult<TransactionEntity, Error, unknown> => {
    const { dispatch } = props;
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (transactionDto: unknown) => {
            return await ExecuteCreateTransactionUseCase(transactionDto);
        },
        onSuccess(data) {
            dispatch({ type: "add-transaction", payload: { transaction: data } });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        // NOTA: Sin 'onError' debido a que el sistema global ya lo maneja
    });

    return {
        executeMutation: mutate,
        isPending,
        hasError: isError,
        errorDetails: error,
        isSuccessful: !isError, // O isSuccess si está disponible y aplica
    };
};
```
