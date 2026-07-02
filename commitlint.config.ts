import type { UserConfig } from "@commitlint/types";

const commitlintConfiguration: UserConfig = {
    extends: [],
    rules: {
        "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "chore"]],
        "type-case": [2, "always", "lower-case"],
        "type-empty": [2, "never"],

        "scope-enum": [
            2,
            "always",
            [
                "config", // Para src/config/
                "shared", // Para src/shared/
                "expenses", // Para src/features/expenses/
                "root", // Para App.tsx, main.tsx, vite.config.ts, package.json
                "ci", // Para .github/, .husky/, y flujos de trabajo
            ],
        ],
        "scope-case": [2, "always", "kebab-case"],
        "scope-empty": [1, "never"],

        "subject-case": [2, "always", "lower-case"],
        "subject-empty": [2, "never"],
        "subject-full-stop": [2, "never", "."],
        "header-max-length": [2, "always", 72],
    },
};

export default commitlintConfiguration;
