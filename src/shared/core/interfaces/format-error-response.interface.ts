export interface FormattedErrorResponse {
    message: string;
    path: string;
}

export interface ErrorResponses {
    errors: FormattedErrorResponse[];
}
