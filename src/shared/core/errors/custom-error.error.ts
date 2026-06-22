import type { FormattedErrorResponse } from "src/shared/core/interfaces/format-error-response.interface";

interface PropsBadRequest {
    payload: Array<FormattedErrorResponse>;
    path: string;
}

interface Props {
    message?: string;
    path: string;
}

export class CustomError extends Error {
    public readonly statusCode: number;
    public readonly errors: Array<FormattedErrorResponse>;

    private constructor(statusCode: number, errors: Array<FormattedErrorResponse>) {
        const defaultMessage = errors.length > 0 ? errors[0].message : "An unexpected error occurred";

        super(defaultMessage);

        this.statusCode = statusCode;
        this.errors = errors;

        // Restore prototype chain to allow 'instanceof CustomError' checks to work
        Object.setPrototypeOf(this, new.target.prototype);
    }

    /**
     * @description Creates a 400 Bad Request error. Handles both simple strings and backend array formats.
     */
    public static badRequest(props: PropsBadRequest): CustomError {
        const { payload, path } = props;
        const formattedErrors = typeof payload === "string" ? [{ message: payload, path }] : payload;

        return new CustomError(400, formattedErrors);
    }

    /**
     * @description Creates a 401 Unauthorized error
     */
    public static unauthorized({ message = "No autorizado", path }: Props): CustomError {
        return new CustomError(401, [{ message, path }]);
    }

    /**
     * @description Creates a 403 Forbidden error
     */
    public static forbidden({ message = "No autorizado", path }: Props): CustomError {
        return new CustomError(403, [{ message, path }]);
    }

    /**
     * @description Creates a 404 Not Found error
     */
    public static notFound({ message = "No encontrado", path }: Props): CustomError {
        return new CustomError(404, [{ message, path }]);
    }

    /**
     * @description Creates a 409 Conflict error
     */
    public static conflict({ message = "Conflicto", path }: Props): CustomError {
        return new CustomError(409, [{ message, path }]);
    }

    /**
     * @description Creates a 500 Internal Server error
     */
    public static internalServer({ message = "Error interno del servidor", path = "desconocido" }: Props): CustomError {
        return new CustomError(500, [{ message, path }]);
    }

    /**
     * @description Creates a 503 Service Unavailable error
     */
    public static serviceUnavailable({
        message = "Servicio no disponible temporalmente",
        path = "desconocido",
    }: Props): CustomError {
        return new CustomError(503, [{ message, path }]);
    }
}
