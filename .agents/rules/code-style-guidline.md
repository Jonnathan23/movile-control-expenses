---
trigger: always_on
---

# Strict Code Style & Formatting Rules

When generating or modifying code, you MUST adhere to the following constraints based on our ESLint configuration:

## 1. General Style & Kernighan and Ritchie (K&R)

- **Formatting:** Strictly follow the Kernighan and Ritchie (K&R) style. Always use curly braces `{}` for block statements (if, while, for, switch), even for single-line statements.
- **Language:** All code (variables, functions, classes, comments) MUST be written in English. Do not translate technical project terms (e.g., "sprint") to Spanish.
- **Paths:** ALWAYS use absolute paths starting with `src/`. Relative paths (`../`, `./`, etc.) are strictly forbidden in all files.
- **Modification Rule:** DO NOT rename existing variables, functions, or classes in the user's provided code unless explicitly instructed to do so. Do not alter existing business logic without permission.

## 2. Naming Conventions (No Abbreviations)

- **Variables & Properties:** Use English nouns. NO abbreviations. Use `camelCase` (global variables can be `UPPER_CASE`).
- **Functions & Methods:** Start with a verb (e.g., `get`, `create`, `validate`). Use `camelCase`.
- **Booleans:** Must start with a prefix like `is`, `has`, `should`, `can`, `did`, `will` (e.g., `isVerified`, `didFetch`).
- **Arrays/Collections:** Use plural nouns (e.g., `users`, `activeAccounts`).
- **Classes, Interfaces, & Types:** Use English nouns. Use `PascalCase`. Interfaces should not contain implementation details.
- **Enums:** NEVER use the native `enum` keyword. Instead, use a Plain Old Javascript Object (POJO) with `as const` and extract its type using `typeof` and `keyof typeof`. The object must be `UPPER_SNAKE_CASE` and the extracted type `PascalCase`.

    ```typescript
    export const ACCOUNT_TYPE = {
        CASH: "cash",
        BANK: "bank",
        CREDIT: "credit",
        SAVINGS: "savings",
    } as const;

    export type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE];
    ```

- **Magic Values:** Avoid them completely. Extract numbers or strings into well-named constants. (Numbers `-1`, `0`, and `1` are allowed).

## 3. TypeScript & Object-Oriented Programming

- **No `any`:** The `any` type is strictly prohibited. Use `unknown` or define proper interfaces/types.
- **Access Modifiers:** All class properties and methods MUST have explicit access modifiers (`public`, `private`, `protected`).
- **Separation of Concerns:** Strictly separate DTOs (Data Transfer Objects) from Entity models. Do not assume their structures; ask the user for the Entity if needed.
- **Return Types:** Explicit function return types are mandatory in `.ts` files (allow typed function expressions).
- **Modern TypeScript Features:** Prefer optional chaining (`?.`), nullish coalescing (`??`), and `for-of` loops over older alternatives.
- **Unused Variables:** Any unused variables, arguments, or caught errors must be prefixed with an underscore (`_`).

## 4. React Specific Rules

- **State Management:** DO NOT use standard React state (`useState`) for core logic or data fetching. Strictly use TanStack Query combined with custom hooks.
- **Event Handlers:**
    - Functions passed as props must start with `on` (e.g., `onClick`, `onClose`).
    - Internal component functions handling events must start with `handle` (e.g., `handleButtonClick`, `handleModalClose`).

## 5. Clean Architecture Dependencies

- **Domain:** The Domain layer must NOT depend on Infrastructure, Presentation, or DI.
- **Application:** The Application layer must ONLY interact with the Domain layer. It must not interact with Infrastructure or Presentation.
- **Infrastructure:** The Infrastructure layer must NOT know the UI (Presentation) nor DI.

## 6. Imports Structure

- Imports must be sorted automatically and cleanly. The established order is:
    1. React and third-party libraries (e.g., `react`, `@tanstack/react-query`).
    2. `src/shared/` global resources.
    3. `src/shared/` scoped resources by Clean Architecture layers (`domain`, `infrastructure`, `application`).
    4. `src/features/` scoped resources by Clean Architecture layers (`domain`, `infrastructure`, `application`).
    5. Other internal imports (`src/`).

# Code Example

```tsx
// src/components/users/user-profile.tsx
import { useUserProfile } from "src/hooks/use-user-profile";
import { UserModal } from "src/components/users/user-modal";

interface UserProfileProps {
    onUpdateComplete: () => void;
}

export const UserProfile = ({ onUpdateComplete }: UserProfileProps): JSX.Element => {
    // Relying on TanStack/Custom hooks, no useState for data
    const { data: userEntity, isFetching } = useUserProfile();

    const handleProfileEditClick = () => {
        // Handle logic here
    };

    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <button onClick={handleProfileEditClick}>Edit Profile</button>
            <UserModal onClose={onUpdateComplete} />
        </div>
    );
};
```
