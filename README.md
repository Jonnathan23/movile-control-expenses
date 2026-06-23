# Mobile Control Expenses

Aplicación web para el control de gastos personales. Desarrollada con React, TypeScript y Vite bajo Clean Architecture.

## Requisitos Previos

- Es **estrictamente necesario** tener instalado [pnpm](https://pnpm.io/) en tu sistema para la gestión de dependencias.
- Es _opcional_ tener instalado [Bun](https://bun.sh/) en tu sistema para ejecutar los scripts, pero es **recomendado** para un mejor rendimiento.

## Instalación y Ejecución

1. Instala las dependencias del proyecto:

    ```bash
    pnpm install
    ```

2. Inicia el servidor de desarrollo:

    ```bash
    bun run dev
    ```

    o tambien con:

    ```bash
    pnpm run dev
    ```

## Validaciones y Calidad de Código

Este proyecto asegura la calidad del código mediante:

- **ESLint**: Reglas estrictas de linteo para mantener un estándar consistente. Puedes revisar el estado ejecutando `bun run lint` y/o `bun run lint:fs`.
- **Husky**: Hooks de Git pre-commit integrados que validan y formatean el código automáticamente antes de permitir realizar un commit.
