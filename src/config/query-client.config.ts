import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { CustomError } from "src/shared/core/errors/custom-error.error";

export const createQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
        queryCache: new QueryCache({
            onError: (error) => {
                if (error instanceof CustomError) {
                    const errorMessage = error.errors[0]?.message || "Error en la consulta";

                    //TODO: emitir eun mensaje
                    console.error(errorMessage);
                    return;
                }

                console.error("Ocurrió un error inesperado");
            },
        }),
        mutationCache: new MutationCache({
            onError: (error) => {
                if (error instanceof CustomError) {
                    const errorMessage = error.errors[0]?.message || "Ocurrió un error inesperado";

                    //TODO: emitir eun mensaje
                    console.error(errorMessage);

                    return;
                }

                console.error("Ocurrió un error inesperado");
            },
        }),
    });
};
