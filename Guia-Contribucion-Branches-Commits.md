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

`expenses` `src/features/expenses/`

`shared` `src/shared/`

`config` `src/config/`

`root` Archivos base (`App.tsx`, `package.json`,
`vite.config.ts`, etc.)

`ci` `.github/`, `.husky/`

---

### ✅ Ejemplos válidos

```bash
git commit -m "feat(expenses): create budget form component"
git commit -m "fix(shared): resolve timezone issue in date format"
git commit -m "chore(root): update lockfile dependencies"
git commit -m "refactor(expenses): clean up save expense use case"
```

### ❌ Ejemplos inválidos

```bash
git commit -m "Actualice el formulario"
```

- Falta el tipo y el scope.
- Está escrito en español.

```bash
git commit -m "feat(UI): add button"
```

- `UI` no es un scope permitido.
- Contiene mayúsculas.

```bash
git commit -m "fix(expenses): Fix bug."
```

- La descripción inicia con mayúscula.
- Termina con punto final.

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
