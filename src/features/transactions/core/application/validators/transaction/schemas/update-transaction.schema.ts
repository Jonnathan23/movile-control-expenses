import z from "zod";

import { TRANSACTION_TYPE } from "src/features/transactions/core/domain/enums/transaction.enum";

const MIN_CHARACTERS = 3;
const MIN_DESCRIPTION_CHARACTERS = 5;
const SAFE_TEXT_REGEX = /^[a-zA-Z0-9\s\-_.,!¡?¿@ñÑáéíóúÁÉÍÓÚ]+$/;

export const UpdateTransactionValidateSchema = z.object({
    type: z.enum(TRANSACTION_TYPE, { message: "Invalid type" }),
    amount: z.number({ message: "Invalid amount" }).positive("Invalid amount"),
    categoryId: z.uuid({ message: "Invalid category" }),
    categoryName: z
        .string({ message: "Invalid category name" })
        .min(MIN_CHARACTERS, "Invalid category name")
        .regex(SAFE_TEXT_REGEX, "Invalid characters detected"),
    description: z
        .string({ message: "Invalid description" })
        .min(MIN_DESCRIPTION_CHARACTERS, "Invalid description")
        .regex(SAFE_TEXT_REGEX, "Invalid characters detected"),
    date: z.date({ message: "Invalid date" }),
});
