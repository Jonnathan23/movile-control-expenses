import type { KnipConfig } from 'knip';

const knipConfiguration: KnipConfig = {
    // Puntos de entrada principales de tu aplicacion
    entry: [
        'src/index.ts', 
        'src/main.ts',
        'src/App.tsx'
    ],
    // Todos los archivos que Knip deberia analizar
    project: [
        'src/**/*.ts', 
        'src/**/*.tsx'
    ],
    // Directorios o archivos que el analizador debe saltarse
    ignore: [
        'node_modules/**',
        'dist/**',
        'build/**'
    ],
    // Dependencias que utilizamos en scripts o configuraciones, 
    // pero que no se importan directamente en el codigo fuente
    ignoreDependencies: [
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint',
        'eslint-plugin-unicorn',
        'typescript'
    ],
    // Ignorar las exportaciones que solo se usan dentro del mismo archivo
    ignoreExportsUsedInFile: true
};

export default knipConfiguration;