import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
    eslintPluginPrettierRecommended,
    globalIgnores([
        "node_modules",
        "dist",
        "build",
        ".agents",
        "**/*.config.js",
        "**/*.config.mjs",
        "**/*.config.ts",
        "**/*.json",
    ]),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                project: ["./tsconfig.app.json", "./tsconfig.node.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            react: reactPlugin,
        },
        rules: {
            "react/jsx-handler-names": [
                "error",
                {
                    eventHandlerPrefix: "handle",
                    eventHandlerPropPrefix: "on",
                    checkLocalVariables: true,
                    checkInlineFunction: true
                }
            ],
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: ["../*", "./*", "..", "."],
                            message: 'Las rutas relativas están prohibidas. Utiliza rutas absolutas comenzando con "src/".',
                        },
                    ],
                },
            ],
            "no-console": [
                "error",
                {
                    allow: ["warn", "error"],
                },
            ],
            // 🚫 Prohibir el uso de 'any'
            "@typescript-eslint/no-explicit-any": "error",
            // 🔒 Forzar modificadores de acceso en clases (public/private/protected)
            "@typescript-eslint/explicit-member-accessibility": [
                "error",
                {
                    accessibility: "explicit",
                    overrides: {
                        constructors: "no-public", // Opcional: no exigir 'public' en constructores
                    }
                }
            ],
            // Reglas estrictas de nomenclatura
            "@typescript-eslint/naming-convention": [
                "error",
                // 1. Clases, Interfaces, Types y Enums en PascalCase
                {
                    selector: ["class", "interface", "typeAlias", "typeParameter", "enum"],
                    format: ["PascalCase"],
                },
                // 2. Miembros de un Enum estrictamente en UPPER_CASE (UPPER_SNAKE_CASE)
                {
                    selector: "enumMember",
                    format: ["UPPER_CASE"],
                },
                // 3. Variables booleanas deben usar prefijos específicos
                {
                    selector: "variable",
                    types: ["boolean"],
                    format: ["PascalCase"],
                    prefix: ["is", "should", "has", "can", "did", "will"],
                },
                // 4. Ignorar variables que provengan de un import
                {
                    selector: "import",
                    format: null,
                },
                // 5. Variables en el scope global (ej. componentes React) pueden ser PascalCase
                {
                    selector: "variable",
                    modifiers: ["global"],
                    format: ["camelCase", "PascalCase", "UPPER_CASE"],
                },
                // 6. Funciones en el scope global pueden ser PascalCase
                {
                    selector: "function",
                    modifiers: ["global"],
                    format: ["camelCase", "PascalCase"],
                },
                // 7. El resto de variables y funciones estrictamente en camelCase
                {
                    selector: "variable",
                    format: ["camelCase"],
                },
                {
                    selector: "function",
                    format: ["camelCase"],
                },
                // 8. Propiedades y métodos de clases estrictamente en camelCase
                {
                    selector: ["classProperty", "classMethod"],
                    format: ["camelCase"],
                },
            ],
        },
    },
    eslintPluginPrettierRecommended,
]);
