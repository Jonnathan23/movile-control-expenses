/** @type {import('dependency-cruiser').IConfiguration} */
const dependencyCruiserConfiguration = {
    forbidden: [
        /* REGLA 1: Pureza del Dominio */
        {
            name: "domain-must-be-pure",
            severity: "error",
            comment: "El Domain no debe depender de ninguna capa externa (application, infrastructure, presentation, di).",
            from: { path: "domain" },
            to: { path: "(application|infrastructure|presentation|di)" },
        },

        /* REGLA 2: Aislamiento de la Aplicación */
        {
            name: "application-cannot-depend-on-infrastructure",
            severity: "error",
            comment: "Application (Casos de uso) solo debe interactuar con el Domain.",
            from: { path: "application" },
            to: { path: "(infrastructure|presentation|di)" },
        },

        /* REGLA 3: Aislamiento de la Infraestructura */
        {
            name: "infrastructure-cannot-depend-on-application",
            severity: "error",
            comment: "Infrastructure no debe conocer los casos de uso ni la UI.",
            from: { path: "infrastructure" },
            to: { path: "(application|presentation|di)" },
        },

        /* REGLA 4: El Dominio no usa librerías externas (Opcional pero recomendado) */
        {
            name: "domain-cannot-depend-on-external-modules",
            severity: "warn", // Lo dejamos en warn por si necesitas alguna utilidad nativa
            comment: "El Domain debe ser agnóstico a librerías de terceros.",
            from: { path: "domain" },
            to: { path: "node_modules" },
        },
    ],
    options: {
        doNotFollow: {
            path: "node_modules",
        },
        tsPreCompilationDeps: true,
        tsConfig: {
            fileName: "tsconfig.app.json",
        },
    },
};

export default dependencyCruiserConfiguration;
