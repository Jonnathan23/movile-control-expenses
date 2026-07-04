# 👨‍💻 Control de gastos personales

Aplicación web para el control de gastos personales. Desarrollada con React, TypeScript y Vite bajo Clean Architecture.

---

## Requisitos Previos

- Es **estrictamente necesario** tener instalado [pnpm](https://pnpm.io/) en tu sistema para la gestión de dependencias.
- Es _opcional_ tener instalado [Bun](https://bun.sh/) en tu sistema para ejecutar los scripts, pero es **recomendado** para un mejor rendimiento.

- **IMPORTANTE:** Para poder realizar contribuciones al proyecto, es **indispensable** leer el archivo [CONTRIBUTING.md](CONTRIBUTING.md) para conocer las convenciones del proyecto.
- En caso de que necesites informacion adicional acerca de los commits y las ramas, leer el archivo [Guia-Contribucion-Branches-Commits.md](Guia-Contribucion-Branches-Commits.md).

## 🚀 Instalación y Ejecución

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

---

## 🛡️ Validaciones y Calidad de Código

Este proyecto asegura la calidad del código mediante:

- **ESLint**: Reglas estrictas de linteo para mantener un estándar consistente. Puedes revisar el estado ejecutando `bun run lint` y/o `bun run lint:fs`.
- **Husky**: Hooks de Git pre-commit integrados que validan y formatean el código automáticamente antes de permitir realizar un commit.

## ⚙️ Configuración de `.vscode`

El proyecto esta fuertemente ligado a la configuración de [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/), por lo que es **altamente recomendable** crear de forma local el archivo `.vscode/settings.json` en la raíz del proyecto y agregarle la siguiente configuración. Esto permitirá que tu editor se integre perfectamente, formateando y reparando problemas de estilo de forma automática al guardar.

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.workingDirectories": [{ "mode": "auto" }],

    "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

Para que esta configuración funcione correctamente, asegúrate de tener instaladas las siguientes extensiones oficiales en tu editor:

- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)

---

## 🧹 Herramientas para la calidad del código

El proyecto cuenta con los siguientes scripts para asegurar la calidad del código y mantener la arquitectura en orden:

1. **Verificación de Tipos (TypeScript)**
    - `typecheck`: Ejecuta el compilador de TypeScript para buscar errores de tipado en todo el proyecto.
    - `typecheck:logs:linux` / `typecheck:logs:windows`: Guarda los errores de TypeScript en un archivo `tsc.logs` (muy útil cuando hay demasiados errores para leer en la terminal).
2. **Análisis Estático (ESLint)**
    - `lint`: Ejecuta ESLint para encontrar y reportar problemas de sintaxis o estilo de código.
3. **Validación de Estructura y Arquitectura**
    - `lint:fs`: Ejecuta `ls-lint` para verificar que los nombres de archivos y carpetas cumplan con las convenciones (kebab-case).
    - `lint:deps`: Ejecuta `dependency-cruiser` para validar que se respeten las reglas de dependencias de la Clean Architecture.

Puedes ejecutar cualquiera de estos scripts usando `pnpm` o `bun`:

```bash
# Ejemplos de uso:
pnpm run typecheck
bun run lint:deps
bun run lint
```

---

## 📱 Soporte para plataformas móviles

Para construir la aplicación y sincronizarla con el emulador de android:

```bash
bun run build
bunx cap sync
```

Para ejecutar la aplicación en un emulador de android:

```bash
bunx cap run android
```
