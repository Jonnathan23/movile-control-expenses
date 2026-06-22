import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
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
        },
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            // Bloquea cualquier ruta que intente subir un nivel (../),
                            // referenciar el nivel actual (./), o referenciar el index del directorio (. o ..)
                            group: ["../*", "./*", "..", "."],
                            message: 'Las rutas relativas estan prohibidas. Utiliza rutas absolutas comenzando con "src/".',
                        },
                    ],
                },
            ],
            // Reglas estrictas de nomenclatura
            "@typescript-eslint/naming-convention": [
                "error",
                // 1. Clases, Interfaces y Types en PascalCase
                {
                    selector: ["class", "interface", "typeAlias", "typeParameter"],
                    format: ["PascalCase"],
                },
                // 2. Ignorar variables que provengan de un import para evitar errores con dependencias externas
                {
                    selector: "import",
                    format: null,
                },
                // 3. Variables en el scope global (ej. componentes React) pueden ser PascalCase
                {
                    selector: "variable",
                    modifiers: ["global"],
                    format: ["camelCase", "PascalCase", "UPPER_CASE"],
                },
                // 4. Funciones en el scope global pueden ser PascalCase
                {
                    selector: "function",
                    modifiers: ["global"],
                    format: ["camelCase", "PascalCase"],
                },
                // 5. El resto de variables y funciones (locales/internas) estrictamente en camelCase
                {
                    selector: "variable",
                    format: ["camelCase"],
                },
                {
                    selector: "function",
                    format: ["camelCase"],
                },
            ],
        },
    },
    eslintPluginPrettierRecommended,
]);
