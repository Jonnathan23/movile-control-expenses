# 📖 Guía de Contribución y Estándares del Repositorio

Bienvenido a la documentación de estándares del proyecto. Para mantener
un historial limpio, organizado y evitar conflictos en el desarrollo
colaborativo, nos regimos por las siguientes convenciones para el manejo
de ramas y mensajes de commits.

## 🌿 1. Estrategia de Ramas (Branching)

### Ramas Base

- **production**
    - Contiene el código estable que está en vivo.
    - No se permite hacer **push** directo.
    - Todo cambio llega mediante un **Pull Request** aprobado por el
      **Code Owner**.
- **develop**
    - Rama principal de integración.
    - Aquí se fusionan todas las nuevas funcionalidades antes de pasar
      a producción.

### Ramas de Desarrollo (Épicas y Tareas)

Se utiliza **kebab-case** (minúsculas y palabras separadas por guiones).

#### Ramas Épicas (`epic/<modulo>`)

- Nacen desde `develop`.
- Agrupan múltiples tareas de un mismo módulo.

**Ejemplo:**

```text
epic/expenses
```

#### Ramas de Tareas (`<tipo>/<modulo>-<funcionalidad>`)

- Nacen desde una rama épica.
- Se fusionan nuevamente a la rama épica mediante un Pull Request.

**Formato:**

```text
tipo/modulo-breve-descripcion
```

**Ejemplos:**

```text
feat/expenses-budget-form
fix/shared-currency-format
refactor/config-query-client
```

---

## 💬 2. Convención de Commits

Se utiliza una adaptación de **Conventional Commits**, validada
automáticamente mediante **Husky** y **Commitlint**.

### Estructura obligatoria

```text
tipo(scope): descripción breve y en imperativo
```

> Todo el mensaje debe escribirse en **minúsculas** y **en inglés**.

### Tipos permitidos (`tipo`)

---

Tipo Descripción

---

`feat` Nueva funcionalidad.

`fix` Corrección de errores o bugs.

`docs` Cambios únicamente en documentación.

`style` Cambios de formato sin afectar la lógica.

`refactor` Reestructuración de código sin agregar
funcionalidades ni corregir bugs.

`chore` Mantenimiento, dependencias, scripts, etc.

---

### Scopes permitidos (`scope`)

---

Scope Ubicación

---

- **`expenses`**: `src/features/expenses/`
- **`shared`**: `src/shared/`
- **`config`**: `src/config/`
- **`android`**: `android/`
- **`public`**: `public/`
- **`deps`**: `package.json`, `pnpm-lock.yaml`
- **`tools`**: `vite.config.ts`, `eslint.config.js`, `commitlint...`, `tsconfig...`
- **`root`**: Archivos base de la app (`App.tsx`, `main.tsx`, `index.html`)
- **`ci`**: `.github/`, `.husky/`

---

### ✅ Ejemplos válidos

- ✅ `git commit -m "feat(expenses): create budget form component"`
- ✅ `git commit -m "fix(shared): resolve timezone issue in date format"`
- ✅ `git commit -m "chore(deps): update lockfile dependencies"`
- ✅ `git commit -m "refactor(tools): migrate config to typescript"`
- ✅ `git commit -m "feat(android): add push notification permissions"`

### ❌ Ejemplos inválidos

- ❌ `git commit -m "Actualice el formulario"`
    - **Error:** Falta el tipo y el scope.
- ❌ `git commit -m "feat(UI): add button"`
    - **Error:** `UI` no es un scope permitido y contiene mayúsculas.
- ❌ `git commit -m "fix(expenses): Fix bug."`
    - **Error:** La descripción inicia con mayúscula y termina con punto final.
- ❌ `git commit -m "chore(root): update package.json"`
    - **Error:** El scope `root` ya no debe usarse para dependencias, se debe usar `deps`.

### Explicacion de scopes

- **`expenses`**: Cambios exclusivos relacionados con la funcionalidad de gastos, presupuestos y su lógica de negocio.
- **`shared`**: Componentes de UI comunes, utilidades, helpers y lógica compartida entre múltiples módulos de la aplicación.
- **`config`**: Configuraciones e inicializaciones globales del proyecto (por ejemplo, configuración de QueryClient o Axios).
- **`android`**: Ajustes nativos específicos para la plataforma Android (archivos gradle, manifest, permisos, etc.).
- **`public`**: Manejo de recursos estáticos, imágenes, íconos y fuentes expuestos públicamente.
- **`deps`**: Modificaciones relacionadas exclusivamente con la adición, actualización o eliminación de dependencias.
- **`tools`**: Actualización de reglas, plugins y configuraciones de herramientas de desarrollo (Vite, TypeScript, linters, formateadores).
- **`root`**: Modificaciones en los puntos de entrada y montaje principales de la aplicación en React.
- **`ci`**: Cambios en la integración continua, flujos de trabajo de GitHub Actions o automatizaciones de Husky.

---

## 🚀 3. Flujo de Trabajo Cotidiano

1.  Cambiar a la rama épica correspondiente.

```bash
git checkout epic/expenses
```

2.  Actualizar la rama.

```bash
git pull origin epic/expenses
```

3.  Crear una nueva rama de tarea.

```bash
git checkout -b feat/expenses-modal
```

4.  Realizar los cambios y crear el commit.

```bash
git commit -m "feat(expenses): add new expense modal"
```

5.  Subir la rama al repositorio remoto.

```bash
git push origin feat/expenses-modal
```

6.  Abrir un **Pull Request** hacia la rama:

```text
epic/expenses
```
