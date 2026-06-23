---
trigger: always_on
---

# Strict Code Style & Formatting Rules

When generating or modifying code, you MUST adhere to the following constraints:

## 1. General Style & Kernighan and Ritchie (K&R)

- **Formatting:** Strictly follow the Kernighan and Ritchie (K&R) style. Always use curly braces `{}` for block statements (if, while, for, switch), even for single-line statements.
- **Language:** All code (variables, functions, classes, comments) MUST be written in English. Do not translate technical project terms (e.g., "sprint") to Spanish.
- **Paths:** ALWAYS use absolute paths starting with `src/`. Relative paths (`../`, `./`) are strictly forbidden.
- **Modification Rule:** DO NOT rename existing variables, functions, or classes in the user's provided code unless explicitly instructed to do so. Do not alter existing business logic without permission.

## 2. Naming Conventions (No Abbreviations)

- **Variables & Properties:** Use English nouns. NO abbreviations. Use `camelCase`.
- **Functions & Methods:** Start with a verb (e.g., `get`, `create`, `validate`). Use `camelCase`.
- **Booleans:** Must start with a prefix like `is`, `has`, `should`, `can` (e.g., `isVerified`).
- **Arrays/Collections:** Use plural nouns (e.g., `users`, `activeAccounts`).
- **Classes, Interfaces, & Types:** Use English nouns. Use `PascalCase`. Interfaces should not contain implementation details.
- **Enums:** Use `PascalCase` for the Enum name, and `UPPER_SNAKE_CASE` for its members.
- **Magic Values:** Avoid them completely. Extract numbers or strings into well-named constants.

## 3. TypeScript & Object-Oriented Programming

- **No `any`:** The `any` type is strictly prohibited. Use `unknown` or define proper interfaces/types.
- **Access Modifiers:** All class properties and methods MUST have explicit access modifiers (`public`, `private`, `protected`).
- **Separation of Concerns:** Strictly separate DTOs (Data Transfer Objects) from Entity models. Do not assume their structures; ask the user for the Entity if needed.

## 4. React Specific Rules

- **State Management:** DO NOT use standard React state (`useState`) for core logic or data fetching. Strictly use TanStack Query combined with custom hooks.
- **Event Handlers:**
    - Functions passed as props must start with `on` (e.g., `onClick`, `onClose`).
    - Internal component functions handling events must start with `handle` (e.g., `handleButtonClick`, `handleModalClose`).

# Code Example

```tsx
// src/components/users/user-profile.tsx
import { useUserProfile } from "src/hooks/use-user-profile";
import { UserModal } from "src/components/users/user-modal";

interface UserProfileProps {
    onUpdateComplete: () => void;
}

export const UserProfile = ({ onUpdateComplete }: UserProfileProps) => {
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
            <UserModal onClose="{onUpdateComplete}" />
        </div>
    );
};
```
